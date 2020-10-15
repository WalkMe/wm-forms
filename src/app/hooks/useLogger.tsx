
export default function useLogger() {

    const log = process.env.NODE_ENV !== 'production' ? console.log : () => { };
    const logError = process.env.NODE_ENV !== 'production' ? console.error : () => { };

    return {
        log,
        logError
    };
}
