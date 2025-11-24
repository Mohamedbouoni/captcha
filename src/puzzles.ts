export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Wall {
    position: Position;
    size: Position;
    rotation?: Position;
}

export interface MovingPlatform {
    position: Position;
    size: Position;
    movement: {
        axis: 'x' | 'y' | 'z';
        range: number;
        speed: number;
    };
}

export interface RotatingBarrier {
    position: Position;
    size: Position;
    rotation: {
        axis: 'x' | 'y' | 'z';
        speed: number;
    };
}

export interface Gap {
    position: Position;
    size: Position;
}

export interface MazeConfig {
    level: number;
    name: string;
    startPosition: Position;
    goalPosition: Position;
    walls: Wall[];
    movingPlatforms?: MovingPlatform[];
    rotatingBarriers?: RotatingBarrier[];
    gaps?: Gap[];
    timeLimit?: number; // in seconds
}

export const mazeConfigs: MazeConfig[] = [
    // Level 1: Simple ramps and straight path
    {
        level: 1,
        name: "Beginner's Path",
        startPosition: { x: -8, y: 1, z: -8 },
        goalPosition: { x: 8, y: 1, z: 8 },
        walls: [
            // Floor
            { position: { x: 0, y: -0.5, z: 0 }, size: { x: 20, y: 1, z: 20 } },
            // Outer walls
            { position: { x: 0, y: 1, z: -10 }, size: { x: 20, y: 2, z: 1 } },
            { position: { x: 0, y: 1, z: 10 }, size: { x: 20, y: 2, z: 1 } },
            { position: { x: -10, y: 1, z: 0 }, size: { x: 1, y: 2, z: 20 } },
            { position: { x: 10, y: 1, z: 0 }, size: { x: 1, y: 2, z: 20 } },
            // Simple maze walls
            { position: { x: -3, y: 1, z: -3 }, size: { x: 1, y: 2, z: 8 } },
            { position: { x: 3, y: 1, z: 3 }, size: { x: 1, y: 2, z: 8 } },
            { position: { x: 0, y: 1, z: 0 }, size: { x: 6, y: 2, z: 1 } },
        ],
    },

    // Level 2: Moving platforms and gaps
    {
        level: 2,
        name: "Dynamic Pathways",
        startPosition: { x: -8, y: 1, z: -8 },
        goalPosition: { x: 8, y: 1, z: 8 },
        walls: [
            // Floor (with gaps)
            { position: { x: -5, y: -0.5, z: 0 }, size: { x: 10, y: 1, z: 20 } },
            { position: { x: 5, y: -0.5, z: 0 }, size: { x: 10, y: 1, z: 20 } },
            // Outer walls
            { position: { x: 0, y: 1, z: -10 }, size: { x: 20, y: 2, z: 1 } },
            { position: { x: 0, y: 1, z: 10 }, size: { x: 20, y: 2, z: 1 } },
            { position: { x: -10, y: 1, z: 0 }, size: { x: 1, y: 2, z: 20 } },
            { position: { x: 10, y: 1, z: 0 }, size: { x: 1, y: 2, z: 20 } },
            // Maze walls
            { position: { x: -5, y: 1, z: -5 }, size: { x: 1, y: 2, z: 6 } },
            { position: { x: 5, y: 1, z: 5 }, size: { x: 1, y: 2, z: 6 } },
        ],
        movingPlatforms: [
            {
                position: { x: 0, y: 0, z: -3 },
                size: { x: 4, y: 1, z: 4 },
                movement: { axis: 'x', range: 4, speed: 1 }
            },
            {
                position: { x: 0, y: 0, z: 3 },
                size: { x: 4, y: 1, z: 4 },
                movement: { axis: 'x', range: 4, speed: 1.5 }
            },
        ],
        gaps: [
            { position: { x: 0, y: -0.5, z: -3 }, size: { x: 6, y: 1, z: 4 } },
            { position: { x: 0, y: -0.5, z: 3 }, size: { x: 6, y: 1, z: 4 } },
        ],
    },

    // Level 3: Rotating barriers and time gates
    {
        level: 3,
        name: "Master's Challenge",
        startPosition: { x: -8, y: 1, z: -8 },
        goalPosition: { x: 8, y: 1, z: 8 },
        walls: [
            // Floor
            { position: { x: 0, y: -0.5, z: 0 }, size: { x: 20, y: 1, z: 20 } },
            // Outer walls
            { position: { x: 0, y: 1, z: -10 }, size: { x: 20, y: 2, z: 1 } },
            { position: { x: 0, y: 1, z: 10 }, size: { x: 20, y: 2, z: 1 } },
            { position: { x: -10, y: 1, z: 0 }, size: { x: 1, y: 2, z: 20 } },
            { position: { x: 10, y: 1, z: 0 }, size: { x: 1, y: 2, z: 20 } },
            // Complex maze walls
            { position: { x: -6, y: 1, z: -6 }, size: { x: 1, y: 2, z: 8 } },
            { position: { x: 6, y: 1, z: 6 }, size: { x: 1, y: 2, z: 8 } },
            { position: { x: -3, y: 1, z: 3 }, size: { x: 6, y: 2, z: 1 } },
            { position: { x: 3, y: 1, z: -3 }, size: { x: 6, y: 2, z: 1 } },
        ],
        movingPlatforms: [
            {
                position: { x: -3, y: 0, z: 0 },
                size: { x: 3, y: 1, z: 3 },
                movement: { axis: 'z', range: 5, speed: 1.2 }
            },
            {
                position: { x: 3, y: 0, z: 0 },
                size: { x: 3, y: 1, z: 3 },
                movement: { axis: 'x', range: 4, speed: 1.8 }
            },
        ],
        rotatingBarriers: [
            {
                position: { x: 0, y: 1, z: -5 },
                size: { x: 8, y: 2, z: 0.5 },
                rotation: { axis: 'y', speed: 0.5 }
            },
            {
                position: { x: 0, y: 1, z: 5 },
                size: { x: 6, y: 2, z: 0.5 },
                rotation: { axis: 'y', speed: -0.7 }
            },
        ],
        timeLimit: 120, // 2 minutes
    },
];

export function getMazeConfig(level: number): MazeConfig | undefined {
    return mazeConfigs.find(config => config.level === level);
}
