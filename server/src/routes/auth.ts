import { Router, Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import bcryptjs from "bcryptjs"
import User from "../models/User"
import { generateToken, authMiddleware, AuthRequest } from "../middleware/auth"

const router = Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "")

// Google Login
router.post("/google-login", async (req: Request, res: Response) => {
	try {
		const { tokenId } = req.body

		if (!tokenId) {
			return res.status(400).json({ message: "Token ID is required" })
		}

		// Verify the token with Google
		const ticket = await googleClient.verifyIdToken({
			idToken: tokenId,
			audience: process.env.GOOGLE_CLIENT_ID,
		})

		const payload = ticket.getPayload()
		if (!payload) {
			return res.status(400).json({ message: "Invalid token" })
		}

		const { sub, email, name, picture } = payload

		let user = await User.findOne({ email })

		if (!user) {
			// Create new user
			user = await (User as any).create({
				googleId: sub,
				email,
				username: name || (email ? email.split("@")[0] : `user_${sub.slice(0, 8)}`),
				profilePicture: picture,
			})
		} else if (!user.googleId) {
			// Update existing user with Google ID
			user.googleId = sub
			user.profilePicture = picture || user.profilePicture
			await user.save()
		}

		const token = generateToken(user._id.toString())

		res.json({
			success: true,
			token,
			user: {
				id: user._id,
				email: user.email,
				username: user.username,
				profilePicture: user.profilePicture,
			},
		})
	} catch (error: unknown) {
		console.error("Google login error:", error)
		res.status(500).json({ message: "Authentication failed" })
	}
})

// Traditional Register
router.post("/register", async (req: Request, res: Response) => {
	try {
		const { email, username, password } = req.body

		if (!email || !username || !password) {
			return res.status(400).json({ message: "All fields are required" })
		}

		let user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({ message: "User already exists" })
		}

		const hashedPassword = await bcryptjs.hash(password, 10)

		user = await (User as any).create({
			email,
			username,
			password: hashedPassword,
		})

		const token = generateToken(user._id.toString())

		res.json({
			success: true,
			token,
			user: {
				id: user._id,
				email: user.email,
				username: user.username,
			},
		})
	} catch (error: unknown) {
		console.error("Register error:", error)
		res.status(500).json({ message: "Registration failed" })
	}
})

// Traditional Login
router.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" })
		}

		const user = await User.findOne({ email })
		if (!user || !user.password) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		const token = generateToken(user._id.toString())

		res.json({
			success: true,
			token,
			user: {
				id: user._id,
				email: user.email,
				username: user.username,
			},
		})
	} catch (error: unknown) {
		console.error("Login error:", error)
		res.status(500).json({ message: "Login failed" })
	}
})

// Get current user
router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
	try {
		const user = await User.findById(req.userId).select("-password")
		res.json({ user })
	} catch (error: unknown) {
		console.error("Get user error:", error)
		res.status(500).json({ message: "Failed to get user" })
	}
})

export default router
