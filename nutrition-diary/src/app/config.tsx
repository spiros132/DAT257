interface CONFIG {
    X_APP_ID: string | undefined,
    X_APP_KEY: string | undefined
}

export const config: CONFIG = {
    X_APP_ID: process.env.X_APP_ID,
    X_APP_KEY: process.env.X_APP_KEY
}