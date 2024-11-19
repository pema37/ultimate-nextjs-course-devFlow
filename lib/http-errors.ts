export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}



export class ValidationError extends RequestError {
  constructor(fieldErrors: Record<string, string[]>) {
    const message = ValidationError.formatFieldErrors(fieldErrors);
    super(400, message, fieldErrors);
    this.name = "ValidationError";
  }

  /**
   * Formats the field errors into a human-readable string.
   * @param errors - A record of field names and their associated error messages.
   * @returns A formatted error message.
   */
  static formatFieldErrors(errors: Record<string, string[]>): string {
    // Iterate over each field and format its error messages
    const formattedMessages = Object.entries(errors).map(([field, messages]) => {
      // Capitalize the field name
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

      // Check for a "Required" message and handle it specifically
      if (messages.length === 1 && messages[0] === "Required") {
        return `${fieldName} is required`;
      }

      // Otherwise, join the messages with "and"
      return `${fieldName}: ${messages.join(" and ")}`;
    });

    // Join all formatted messages into a single string
    return formattedMessages.join(", ");
  }
}


export class NotFoundError extends RequestError {
  constructor(resource: string = "Resource") {
    super(404, `${resource} not found`);
  }
}


export class ForbiddenError extends RequestError {
  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}


export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}
