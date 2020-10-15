import walkme, { LogLevel } from "@walkme/sdk";

export default function useLogger() {

    const log = process.env.NODE_ENV !== 'production' ? console.log : () => { };

    const logError = async (message?: any, ...optionalParams: any[]) => {
        process.env.NODE_ENV !== 'production' && console.error(message, optionalParams);

        try {
            walkme.platform.log(`[FORMS] ${message || optionalParams}`, LogLevel.Error)
        } catch (error) { }
    }
    return {
        log,
        logError
    };
}
