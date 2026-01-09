import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a Message. */
export interface IMessage {

    /** Message type */
    type?: (Message.Type|null);

    /** Message authInit */
    authInit?: (IAuthInit|null);

    /** Message authChallenge */
    authChallenge?: (IAuthChallenge|null);

    /** Message authResponse */
    authResponse?: (IAuthResponse|null);

    /** Message authResult */
    authResult?: (IAuthResult|null);

    /** Message rangeProofRequest */
    rangeProofRequest?: (IRangeProofRequest|null);

    /** Message rangeProofResult */
    rangeProofResult?: (IRangeProofResult|null);
}

/** Represents a Message. */
export class Message implements IMessage {

    /**
     * Constructs a new Message.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMessage);

    /** Message type. */
    public type: Message.Type;

    /** Message authInit. */
    public authInit?: (IAuthInit|null);

    /** Message authChallenge. */
    public authChallenge?: (IAuthChallenge|null);

    /** Message authResponse. */
    public authResponse?: (IAuthResponse|null);

    /** Message authResult. */
    public authResult?: (IAuthResult|null);

    /** Message rangeProofRequest. */
    public rangeProofRequest?: (IRangeProofRequest|null);

    /** Message rangeProofResult. */
    public rangeProofResult?: (IRangeProofResult|null);

    /** Message payload. */
    public payload?: ("authInit"|"authChallenge"|"authResponse"|"authResult"|"rangeProofRequest"|"rangeProofResult");

    /**
     * Creates a new Message instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Message instance
     */
    public static create(properties?: IMessage): Message;

    /**
     * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
     * @param message Message message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
     * @param message Message message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Message message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Message;

    /**
     * Decodes a Message message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Message;

    /**
     * Verifies a Message message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Message message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Message
     */
    public static fromObject(object: { [k: string]: any }): Message;

    /**
     * Creates a plain object from a Message message. Also converts values to other types if specified.
     * @param message Message
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Message to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Message
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace Message {

    /** Type enum. */
    enum Type {
        AUTH_INIT = 0,
        AUTH_CHALLENGE = 1,
        AUTH_RESPONSE = 2,
        AUTH_RESULT = 3,
        RANGE_PROOF_REQUEST = 4,
        RANGE_PROOF_RESULT = 5
    }
}

/** Properties of an AuthInit. */
export interface IAuthInit {

    /** AuthInit serialId */
    serialId?: (string|null);

    /** AuthInit signature */
    signature?: (Uint8Array|null);
}

/** Represents an AuthInit. */
export class AuthInit implements IAuthInit {

    /**
     * Constructs a new AuthInit.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAuthInit);

    /** AuthInit serialId. */
    public serialId: string;

    /** AuthInit signature. */
    public signature: Uint8Array;

    /**
     * Creates a new AuthInit instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AuthInit instance
     */
    public static create(properties?: IAuthInit): AuthInit;

    /**
     * Encodes the specified AuthInit message. Does not implicitly {@link AuthInit.verify|verify} messages.
     * @param message AuthInit message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAuthInit, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AuthInit message, length delimited. Does not implicitly {@link AuthInit.verify|verify} messages.
     * @param message AuthInit message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAuthInit, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AuthInit message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AuthInit
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthInit;

    /**
     * Decodes an AuthInit message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AuthInit
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthInit;

    /**
     * Verifies an AuthInit message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AuthInit message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AuthInit
     */
    public static fromObject(object: { [k: string]: any }): AuthInit;

    /**
     * Creates a plain object from an AuthInit message. Also converts values to other types if specified.
     * @param message AuthInit
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AuthInit, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AuthInit to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AuthInit
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an AuthChallenge. */
export interface IAuthChallenge {

    /** AuthChallenge randomNumber */
    randomNumber?: (Uint8Array|null);

    /** AuthChallenge signature */
    signature?: (Uint8Array|null);
}

/** Represents an AuthChallenge. */
export class AuthChallenge implements IAuthChallenge {

    /**
     * Constructs a new AuthChallenge.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAuthChallenge);

    /** AuthChallenge randomNumber. */
    public randomNumber: Uint8Array;

    /** AuthChallenge signature. */
    public signature: Uint8Array;

    /**
     * Creates a new AuthChallenge instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AuthChallenge instance
     */
    public static create(properties?: IAuthChallenge): AuthChallenge;

    /**
     * Encodes the specified AuthChallenge message. Does not implicitly {@link AuthChallenge.verify|verify} messages.
     * @param message AuthChallenge message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAuthChallenge, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AuthChallenge message, length delimited. Does not implicitly {@link AuthChallenge.verify|verify} messages.
     * @param message AuthChallenge message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAuthChallenge, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AuthChallenge message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AuthChallenge
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthChallenge;

    /**
     * Decodes an AuthChallenge message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AuthChallenge
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthChallenge;

    /**
     * Verifies an AuthChallenge message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AuthChallenge message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AuthChallenge
     */
    public static fromObject(object: { [k: string]: any }): AuthChallenge;

    /**
     * Creates a plain object from an AuthChallenge message. Also converts values to other types if specified.
     * @param message AuthChallenge
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AuthChallenge, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AuthChallenge to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AuthChallenge
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an AuthResponse. */
export interface IAuthResponse {

    /** AuthResponse signature */
    signature?: (Uint8Array|null);
}

/** Represents an AuthResponse. */
export class AuthResponse implements IAuthResponse {

    /**
     * Constructs a new AuthResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAuthResponse);

    /** AuthResponse signature. */
    public signature: Uint8Array;

    /**
     * Creates a new AuthResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AuthResponse instance
     */
    public static create(properties?: IAuthResponse): AuthResponse;

    /**
     * Encodes the specified AuthResponse message. Does not implicitly {@link AuthResponse.verify|verify} messages.
     * @param message AuthResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAuthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AuthResponse message, length delimited. Does not implicitly {@link AuthResponse.verify|verify} messages.
     * @param message AuthResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAuthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AuthResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AuthResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthResponse;

    /**
     * Decodes an AuthResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AuthResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthResponse;

    /**
     * Verifies an AuthResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AuthResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AuthResponse
     */
    public static fromObject(object: { [k: string]: any }): AuthResponse;

    /**
     * Creates a plain object from an AuthResponse message. Also converts values to other types if specified.
     * @param message AuthResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AuthResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AuthResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AuthResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an AuthResult. */
export interface IAuthResult {

    /** AuthResult success */
    success?: (boolean|null);
}

/** Represents an AuthResult. */
export class AuthResult implements IAuthResult {

    /**
     * Constructs a new AuthResult.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAuthResult);

    /** AuthResult success. */
    public success: boolean;

    /**
     * Creates a new AuthResult instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AuthResult instance
     */
    public static create(properties?: IAuthResult): AuthResult;

    /**
     * Encodes the specified AuthResult message. Does not implicitly {@link AuthResult.verify|verify} messages.
     * @param message AuthResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAuthResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AuthResult message, length delimited. Does not implicitly {@link AuthResult.verify|verify} messages.
     * @param message AuthResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAuthResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AuthResult message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AuthResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthResult;

    /**
     * Decodes an AuthResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AuthResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthResult;

    /**
     * Verifies an AuthResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AuthResult message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AuthResult
     */
    public static fromObject(object: { [k: string]: any }): AuthResult;

    /**
     * Creates a plain object from an AuthResult message. Also converts values to other types if specified.
     * @param message AuthResult
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AuthResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AuthResult to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AuthResult
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RangeProofRequest. */
export interface IRangeProofRequest {

    /** RangeProofRequest minValue */
    minValue?: (number|Long|null);

    /** RangeProofRequest maxValue */
    maxValue?: (number|Long|null);

    /** RangeProofRequest bitLength */
    bitLength?: (number|null);

    /** RangeProofRequest c0 */
    c0?: (Uint8Array|null);

    /** RangeProofRequest c1 */
    c1?: (Uint8Array|null);

    /** RangeProofRequest c2 */
    c2?: (Uint8Array|null);

    /** RangeProofRequest c3 */
    c3?: (Uint8Array|null);

    /** RangeProofRequest rangeC1 */
    rangeC1?: (Uint8Array|null);

    /** RangeProofRequest rangeC2 */
    rangeC2?: (Uint8Array|null);
}

/** Represents a RangeProofRequest. */
export class RangeProofRequest implements IRangeProofRequest {

    /**
     * Constructs a new RangeProofRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRangeProofRequest);

    /** RangeProofRequest minValue. */
    public minValue: (number|Long);

    /** RangeProofRequest maxValue. */
    public maxValue: (number|Long);

    /** RangeProofRequest bitLength. */
    public bitLength: number;

    /** RangeProofRequest c0. */
    public c0: Uint8Array;

    /** RangeProofRequest c1. */
    public c1: Uint8Array;

    /** RangeProofRequest c2. */
    public c2: Uint8Array;

    /** RangeProofRequest c3. */
    public c3: Uint8Array;

    /** RangeProofRequest rangeC1. */
    public rangeC1: Uint8Array;

    /** RangeProofRequest rangeC2. */
    public rangeC2: Uint8Array;

    /**
     * Creates a new RangeProofRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RangeProofRequest instance
     */
    public static create(properties?: IRangeProofRequest): RangeProofRequest;

    /**
     * Encodes the specified RangeProofRequest message. Does not implicitly {@link RangeProofRequest.verify|verify} messages.
     * @param message RangeProofRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRangeProofRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RangeProofRequest message, length delimited. Does not implicitly {@link RangeProofRequest.verify|verify} messages.
     * @param message RangeProofRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRangeProofRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RangeProofRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RangeProofRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RangeProofRequest;

    /**
     * Decodes a RangeProofRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RangeProofRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RangeProofRequest;

    /**
     * Verifies a RangeProofRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RangeProofRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RangeProofRequest
     */
    public static fromObject(object: { [k: string]: any }): RangeProofRequest;

    /**
     * Creates a plain object from a RangeProofRequest message. Also converts values to other types if specified.
     * @param message RangeProofRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RangeProofRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RangeProofRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RangeProofRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a RangeProofResult. */
export interface IRangeProofResult {

    /** RangeProofResult success */
    success?: (boolean|null);
}

/** Represents a RangeProofResult. */
export class RangeProofResult implements IRangeProofResult {

    /**
     * Constructs a new RangeProofResult.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRangeProofResult);

    /** RangeProofResult success. */
    public success: boolean;

    /**
     * Creates a new RangeProofResult instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RangeProofResult instance
     */
    public static create(properties?: IRangeProofResult): RangeProofResult;

    /**
     * Encodes the specified RangeProofResult message. Does not implicitly {@link RangeProofResult.verify|verify} messages.
     * @param message RangeProofResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRangeProofResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RangeProofResult message, length delimited. Does not implicitly {@link RangeProofResult.verify|verify} messages.
     * @param message RangeProofResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRangeProofResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RangeProofResult message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RangeProofResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RangeProofResult;

    /**
     * Decodes a RangeProofResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RangeProofResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RangeProofResult;

    /**
     * Verifies a RangeProofResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RangeProofResult message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RangeProofResult
     */
    public static fromObject(object: { [k: string]: any }): RangeProofResult;

    /**
     * Creates a plain object from a RangeProofResult message. Also converts values to other types if specified.
     * @param message RangeProofResult
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RangeProofResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RangeProofResult to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RangeProofResult
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
