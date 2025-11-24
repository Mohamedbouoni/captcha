import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { captchaStore } from './store.js';
import { getMazeConfig } from './puzzles.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5173', 'http://localhost:3000'];

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Generate new CAPTCHA token
app.post('/api/captcha/generate', (req: Request, res: Response) => {
    try {
        const token = captchaStore.generateToken();
        const mazeConfig = getMazeConfig(1); // Start with level 1

        res.json({
            success: true,
            token: token.token,
            expiresAt: token.expiresAt,
            mazeConfig
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to generate CAPTCHA token'
        });
    }
});

// Get maze configuration for a specific level
app.get('/api/captcha/maze/:level', (req: Request, res: Response) => {
    try {
        const level = parseInt(req.params.level ?? '');

        if (isNaN(level) || level < 1 || level > 3) {
            return res.status(400).json({
                success: false,
                error: 'Invalid level. Must be 1, 2, or 3.'
            });
        }

        const mazeConfig = getMazeConfig(level);

        if (!mazeConfig) {
            return res.status(404).json({
                success: false,
                error: 'Maze configuration not found'
            });
        }

        res.json({
            success: true,
            mazeConfig
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve maze configuration'
        });
    }
});

// Complete CAPTCHA challenge
app.post('/api/captcha/complete', (req: Request, res: Response) => {
    try {
        const { token, level } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                error: 'Token is required'
            });
        }

        const tokenData = captchaStore.getToken(token);

        if (!tokenData) {
            return res.status(404).json({
                success: false,
                error: 'Token not found or expired'
            });
        }

        const completed = captchaStore.completeToken(token, level || 1);

        if (!completed) {
            return res.status(400).json({
                success: false,
                error: 'Failed to complete CAPTCHA'
            });
        }

        res.json({
            success: true,
            message: 'CAPTCHA completed successfully',
            level
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to complete CAPTCHA'
        });
    }
});

// Validate CAPTCHA token
app.post('/api/captcha/validate', (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                error: 'Token is required'
            });
        }

        const isValid = captchaStore.validateToken(token);

        res.json({
            success: true,
            valid: isValid
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to validate token'
        });
    }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`🚀 Gravity Maze CAPTCHA server running on port ${PORT}`);
});
