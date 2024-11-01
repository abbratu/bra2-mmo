export type D3Data = { x: number; y: number; z: number; }

export type Player = {
    id: number;
    name: string;
}

export type EntityState = {
    location: D3Data;
    rotation: D3Data;
}

export type KeyboardState = {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
}

export type PlayerState = EntityState & KeyboardState;
export type PlayerData = PlayerState & Player;
