import logger from "./log";

export const serverError = (errors: Error[]) => {
    throw new Error(JSON.stringify(errors, null, 2));
  };
  
  export const handleError = (
    e: unknown,
  ): {
    error?: {
      message: string;
    };
  } => {
    const err = e as Error;
  
    if (typeof window === 'undefined') {
      logger.error(e);
      return {
        error: {
          message: err.message,
        },
      };
    }
  
    // toast.error(err.message);
    logger.error(e);
  
    return {};
  };