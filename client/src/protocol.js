/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Message = (function() {

    /**
     * Properties of a Message.
     * @exports IMessage
     * @interface IMessage
     * @property {Message.Type|null} [type] Message type
     * @property {IAuthInit|null} [authInit] Message authInit
     * @property {IAuthChallenge|null} [authChallenge] Message authChallenge
     * @property {IAuthResponse|null} [authResponse] Message authResponse
     * @property {IAuthResult|null} [authResult] Message authResult
     * @property {IRangeProofRequest|null} [rangeProofRequest] Message rangeProofRequest
     * @property {IRangeProofResult|null} [rangeProofResult] Message rangeProofResult
     */

    /**
     * Constructs a new Message.
     * @exports Message
     * @classdesc Represents a Message.
     * @implements IMessage
     * @constructor
     * @param {IMessage=} [properties] Properties to set
     */
    function Message(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Message type.
     * @member {Message.Type} type
     * @memberof Message
     * @instance
     */
    Message.prototype.type = 0;

    /**
     * Message authInit.
     * @member {IAuthInit|null|undefined} authInit
     * @memberof Message
     * @instance
     */
    Message.prototype.authInit = null;

    /**
     * Message authChallenge.
     * @member {IAuthChallenge|null|undefined} authChallenge
     * @memberof Message
     * @instance
     */
    Message.prototype.authChallenge = null;

    /**
     * Message authResponse.
     * @member {IAuthResponse|null|undefined} authResponse
     * @memberof Message
     * @instance
     */
    Message.prototype.authResponse = null;

    /**
     * Message authResult.
     * @member {IAuthResult|null|undefined} authResult
     * @memberof Message
     * @instance
     */
    Message.prototype.authResult = null;

    /**
     * Message rangeProofRequest.
     * @member {IRangeProofRequest|null|undefined} rangeProofRequest
     * @memberof Message
     * @instance
     */
    Message.prototype.rangeProofRequest = null;

    /**
     * Message rangeProofResult.
     * @member {IRangeProofResult|null|undefined} rangeProofResult
     * @memberof Message
     * @instance
     */
    Message.prototype.rangeProofResult = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Message payload.
     * @member {"authInit"|"authChallenge"|"authResponse"|"authResult"|"rangeProofRequest"|"rangeProofResult"|undefined} payload
     * @memberof Message
     * @instance
     */
    Object.defineProperty(Message.prototype, "payload", {
        get: $util.oneOfGetter($oneOfFields = ["authInit", "authChallenge", "authResponse", "authResult", "rangeProofRequest", "rangeProofResult"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Message instance using the specified properties.
     * @function create
     * @memberof Message
     * @static
     * @param {IMessage=} [properties] Properties to set
     * @returns {Message} Message instance
     */
    Message.create = function create(properties) {
        return new Message(properties);
    };

    /**
     * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
     * @function encode
     * @memberof Message
     * @static
     * @param {IMessage} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.authInit != null && Object.hasOwnProperty.call(message, "authInit"))
            $root.AuthInit.encode(message.authInit, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.authChallenge != null && Object.hasOwnProperty.call(message, "authChallenge"))
            $root.AuthChallenge.encode(message.authChallenge, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.authResponse != null && Object.hasOwnProperty.call(message, "authResponse"))
            $root.AuthResponse.encode(message.authResponse, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.authResult != null && Object.hasOwnProperty.call(message, "authResult"))
            $root.AuthResult.encode(message.authResult, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.rangeProofRequest != null && Object.hasOwnProperty.call(message, "rangeProofRequest"))
            $root.RangeProofRequest.encode(message.rangeProofRequest, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.rangeProofResult != null && Object.hasOwnProperty.call(message, "rangeProofResult"))
            $root.RangeProofResult.encode(message.rangeProofResult, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Message
     * @static
     * @param {IMessage} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Message message from the specified reader or buffer.
     * @function decode
     * @memberof Message
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Message} Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Message.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Message();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.type = reader.int32();
                    break;
                }
            case 2: {
                    message.authInit = $root.AuthInit.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.authChallenge = $root.AuthChallenge.decode(reader, reader.uint32());
                    break;
                }
            case 4: {
                    message.authResponse = $root.AuthResponse.decode(reader, reader.uint32());
                    break;
                }
            case 5: {
                    message.authResult = $root.AuthResult.decode(reader, reader.uint32());
                    break;
                }
            case 6: {
                    message.rangeProofRequest = $root.RangeProofRequest.decode(reader, reader.uint32());
                    break;
                }
            case 7: {
                    message.rangeProofResult = $root.RangeProofResult.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Message message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Message
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Message} Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Message.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Message message.
     * @function verify
     * @memberof Message
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Message.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.type != null && message.hasOwnProperty("type"))
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.authInit != null && message.hasOwnProperty("authInit")) {
            properties.payload = 1;
            {
                var error = $root.AuthInit.verify(message.authInit);
                if (error)
                    return "authInit." + error;
            }
        }
        if (message.authChallenge != null && message.hasOwnProperty("authChallenge")) {
            if (properties.payload === 1)
                return "payload: multiple values";
            properties.payload = 1;
            {
                var error = $root.AuthChallenge.verify(message.authChallenge);
                if (error)
                    return "authChallenge." + error;
            }
        }
        if (message.authResponse != null && message.hasOwnProperty("authResponse")) {
            if (properties.payload === 1)
                return "payload: multiple values";
            properties.payload = 1;
            {
                var error = $root.AuthResponse.verify(message.authResponse);
                if (error)
                    return "authResponse." + error;
            }
        }
        if (message.authResult != null && message.hasOwnProperty("authResult")) {
            if (properties.payload === 1)
                return "payload: multiple values";
            properties.payload = 1;
            {
                var error = $root.AuthResult.verify(message.authResult);
                if (error)
                    return "authResult." + error;
            }
        }
        if (message.rangeProofRequest != null && message.hasOwnProperty("rangeProofRequest")) {
            if (properties.payload === 1)
                return "payload: multiple values";
            properties.payload = 1;
            {
                var error = $root.RangeProofRequest.verify(message.rangeProofRequest);
                if (error)
                    return "rangeProofRequest." + error;
            }
        }
        if (message.rangeProofResult != null && message.hasOwnProperty("rangeProofResult")) {
            if (properties.payload === 1)
                return "payload: multiple values";
            properties.payload = 1;
            {
                var error = $root.RangeProofResult.verify(message.rangeProofResult);
                if (error)
                    return "rangeProofResult." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Message message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Message
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Message} Message
     */
    Message.fromObject = function fromObject(object) {
        if (object instanceof $root.Message)
            return object;
        var message = new $root.Message();
        switch (object.type) {
        default:
            if (typeof object.type === "number") {
                message.type = object.type;
                break;
            }
            break;
        case "AUTH_INIT":
        case 0:
            message.type = 0;
            break;
        case "AUTH_CHALLENGE":
        case 1:
            message.type = 1;
            break;
        case "AUTH_RESPONSE":
        case 2:
            message.type = 2;
            break;
        case "AUTH_RESULT":
        case 3:
            message.type = 3;
            break;
        case "RANGE_PROOF_REQUEST":
        case 4:
            message.type = 4;
            break;
        case "RANGE_PROOF_RESULT":
        case 5:
            message.type = 5;
            break;
        }
        if (object.authInit != null) {
            if (typeof object.authInit !== "object")
                throw TypeError(".Message.authInit: object expected");
            message.authInit = $root.AuthInit.fromObject(object.authInit);
        }
        if (object.authChallenge != null) {
            if (typeof object.authChallenge !== "object")
                throw TypeError(".Message.authChallenge: object expected");
            message.authChallenge = $root.AuthChallenge.fromObject(object.authChallenge);
        }
        if (object.authResponse != null) {
            if (typeof object.authResponse !== "object")
                throw TypeError(".Message.authResponse: object expected");
            message.authResponse = $root.AuthResponse.fromObject(object.authResponse);
        }
        if (object.authResult != null) {
            if (typeof object.authResult !== "object")
                throw TypeError(".Message.authResult: object expected");
            message.authResult = $root.AuthResult.fromObject(object.authResult);
        }
        if (object.rangeProofRequest != null) {
            if (typeof object.rangeProofRequest !== "object")
                throw TypeError(".Message.rangeProofRequest: object expected");
            message.rangeProofRequest = $root.RangeProofRequest.fromObject(object.rangeProofRequest);
        }
        if (object.rangeProofResult != null) {
            if (typeof object.rangeProofResult !== "object")
                throw TypeError(".Message.rangeProofResult: object expected");
            message.rangeProofResult = $root.RangeProofResult.fromObject(object.rangeProofResult);
        }
        return message;
    };

    /**
     * Creates a plain object from a Message message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Message
     * @static
     * @param {Message} message Message
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Message.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.type = options.enums === String ? "AUTH_INIT" : 0;
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.Message.Type[message.type] === undefined ? message.type : $root.Message.Type[message.type] : message.type;
        if (message.authInit != null && message.hasOwnProperty("authInit")) {
            object.authInit = $root.AuthInit.toObject(message.authInit, options);
            if (options.oneofs)
                object.payload = "authInit";
        }
        if (message.authChallenge != null && message.hasOwnProperty("authChallenge")) {
            object.authChallenge = $root.AuthChallenge.toObject(message.authChallenge, options);
            if (options.oneofs)
                object.payload = "authChallenge";
        }
        if (message.authResponse != null && message.hasOwnProperty("authResponse")) {
            object.authResponse = $root.AuthResponse.toObject(message.authResponse, options);
            if (options.oneofs)
                object.payload = "authResponse";
        }
        if (message.authResult != null && message.hasOwnProperty("authResult")) {
            object.authResult = $root.AuthResult.toObject(message.authResult, options);
            if (options.oneofs)
                object.payload = "authResult";
        }
        if (message.rangeProofRequest != null && message.hasOwnProperty("rangeProofRequest")) {
            object.rangeProofRequest = $root.RangeProofRequest.toObject(message.rangeProofRequest, options);
            if (options.oneofs)
                object.payload = "rangeProofRequest";
        }
        if (message.rangeProofResult != null && message.hasOwnProperty("rangeProofResult")) {
            object.rangeProofResult = $root.RangeProofResult.toObject(message.rangeProofResult, options);
            if (options.oneofs)
                object.payload = "rangeProofResult";
        }
        return object;
    };

    /**
     * Converts this Message to JSON.
     * @function toJSON
     * @memberof Message
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Message.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Message
     * @function getTypeUrl
     * @memberof Message
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Message";
    };

    /**
     * Type enum.
     * @name Message.Type
     * @enum {number}
     * @property {number} AUTH_INIT=0 AUTH_INIT value
     * @property {number} AUTH_CHALLENGE=1 AUTH_CHALLENGE value
     * @property {number} AUTH_RESPONSE=2 AUTH_RESPONSE value
     * @property {number} AUTH_RESULT=3 AUTH_RESULT value
     * @property {number} RANGE_PROOF_REQUEST=4 RANGE_PROOF_REQUEST value
     * @property {number} RANGE_PROOF_RESULT=5 RANGE_PROOF_RESULT value
     */
    Message.Type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "AUTH_INIT"] = 0;
        values[valuesById[1] = "AUTH_CHALLENGE"] = 1;
        values[valuesById[2] = "AUTH_RESPONSE"] = 2;
        values[valuesById[3] = "AUTH_RESULT"] = 3;
        values[valuesById[4] = "RANGE_PROOF_REQUEST"] = 4;
        values[valuesById[5] = "RANGE_PROOF_RESULT"] = 5;
        return values;
    })();

    return Message;
})();

$root.AuthInit = (function() {

    /**
     * Properties of an AuthInit.
     * @exports IAuthInit
     * @interface IAuthInit
     * @property {string|null} [serialId] AuthInit serialId
     * @property {Uint8Array|null} [signature] AuthInit signature
     */

    /**
     * Constructs a new AuthInit.
     * @exports AuthInit
     * @classdesc Represents an AuthInit.
     * @implements IAuthInit
     * @constructor
     * @param {IAuthInit=} [properties] Properties to set
     */
    function AuthInit(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthInit serialId.
     * @member {string} serialId
     * @memberof AuthInit
     * @instance
     */
    AuthInit.prototype.serialId = "";

    /**
     * AuthInit signature.
     * @member {Uint8Array} signature
     * @memberof AuthInit
     * @instance
     */
    AuthInit.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new AuthInit instance using the specified properties.
     * @function create
     * @memberof AuthInit
     * @static
     * @param {IAuthInit=} [properties] Properties to set
     * @returns {AuthInit} AuthInit instance
     */
    AuthInit.create = function create(properties) {
        return new AuthInit(properties);
    };

    /**
     * Encodes the specified AuthInit message. Does not implicitly {@link AuthInit.verify|verify} messages.
     * @function encode
     * @memberof AuthInit
     * @static
     * @param {IAuthInit} message AuthInit message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthInit.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.serialId != null && Object.hasOwnProperty.call(message, "serialId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.serialId);
        if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified AuthInit message, length delimited. Does not implicitly {@link AuthInit.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthInit
     * @static
     * @param {IAuthInit} message AuthInit message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthInit.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthInit message from the specified reader or buffer.
     * @function decode
     * @memberof AuthInit
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthInit} AuthInit
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthInit.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthInit();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.serialId = reader.string();
                    break;
                }
            case 2: {
                    message.signature = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AuthInit message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthInit
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthInit} AuthInit
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthInit.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AuthInit message.
     * @function verify
     * @memberof AuthInit
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AuthInit.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.serialId != null && message.hasOwnProperty("serialId"))
            if (!$util.isString(message.serialId))
                return "serialId: string expected";
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        return null;
    };

    /**
     * Creates an AuthInit message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AuthInit
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AuthInit} AuthInit
     */
    AuthInit.fromObject = function fromObject(object) {
        if (object instanceof $root.AuthInit)
            return object;
        var message = new $root.AuthInit();
        if (object.serialId != null)
            message.serialId = String(object.serialId);
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length >= 0)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from an AuthInit message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AuthInit
     * @static
     * @param {AuthInit} message AuthInit
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AuthInit.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.serialId = "";
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.serialId != null && message.hasOwnProperty("serialId"))
            object.serialId = message.serialId;
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this AuthInit to JSON.
     * @function toJSON
     * @memberof AuthInit
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AuthInit.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for AuthInit
     * @function getTypeUrl
     * @memberof AuthInit
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    AuthInit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/AuthInit";
    };

    return AuthInit;
})();

$root.AuthChallenge = (function() {

    /**
     * Properties of an AuthChallenge.
     * @exports IAuthChallenge
     * @interface IAuthChallenge
     * @property {Uint8Array|null} [randomNumber] AuthChallenge randomNumber
     * @property {Uint8Array|null} [signature] AuthChallenge signature
     */

    /**
     * Constructs a new AuthChallenge.
     * @exports AuthChallenge
     * @classdesc Represents an AuthChallenge.
     * @implements IAuthChallenge
     * @constructor
     * @param {IAuthChallenge=} [properties] Properties to set
     */
    function AuthChallenge(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthChallenge randomNumber.
     * @member {Uint8Array} randomNumber
     * @memberof AuthChallenge
     * @instance
     */
    AuthChallenge.prototype.randomNumber = $util.newBuffer([]);

    /**
     * AuthChallenge signature.
     * @member {Uint8Array} signature
     * @memberof AuthChallenge
     * @instance
     */
    AuthChallenge.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new AuthChallenge instance using the specified properties.
     * @function create
     * @memberof AuthChallenge
     * @static
     * @param {IAuthChallenge=} [properties] Properties to set
     * @returns {AuthChallenge} AuthChallenge instance
     */
    AuthChallenge.create = function create(properties) {
        return new AuthChallenge(properties);
    };

    /**
     * Encodes the specified AuthChallenge message. Does not implicitly {@link AuthChallenge.verify|verify} messages.
     * @function encode
     * @memberof AuthChallenge
     * @static
     * @param {IAuthChallenge} message AuthChallenge message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthChallenge.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.randomNumber != null && Object.hasOwnProperty.call(message, "randomNumber"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.randomNumber);
        if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified AuthChallenge message, length delimited. Does not implicitly {@link AuthChallenge.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthChallenge
     * @static
     * @param {IAuthChallenge} message AuthChallenge message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthChallenge.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthChallenge message from the specified reader or buffer.
     * @function decode
     * @memberof AuthChallenge
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthChallenge} AuthChallenge
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthChallenge.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthChallenge();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.randomNumber = reader.bytes();
                    break;
                }
            case 2: {
                    message.signature = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AuthChallenge message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthChallenge
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthChallenge} AuthChallenge
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthChallenge.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AuthChallenge message.
     * @function verify
     * @memberof AuthChallenge
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AuthChallenge.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.randomNumber != null && message.hasOwnProperty("randomNumber"))
            if (!(message.randomNumber && typeof message.randomNumber.length === "number" || $util.isString(message.randomNumber)))
                return "randomNumber: buffer expected";
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        return null;
    };

    /**
     * Creates an AuthChallenge message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AuthChallenge
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AuthChallenge} AuthChallenge
     */
    AuthChallenge.fromObject = function fromObject(object) {
        if (object instanceof $root.AuthChallenge)
            return object;
        var message = new $root.AuthChallenge();
        if (object.randomNumber != null)
            if (typeof object.randomNumber === "string")
                $util.base64.decode(object.randomNumber, message.randomNumber = $util.newBuffer($util.base64.length(object.randomNumber)), 0);
            else if (object.randomNumber.length >= 0)
                message.randomNumber = object.randomNumber;
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length >= 0)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from an AuthChallenge message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AuthChallenge
     * @static
     * @param {AuthChallenge} message AuthChallenge
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AuthChallenge.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.randomNumber = "";
            else {
                object.randomNumber = [];
                if (options.bytes !== Array)
                    object.randomNumber = $util.newBuffer(object.randomNumber);
            }
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.randomNumber != null && message.hasOwnProperty("randomNumber"))
            object.randomNumber = options.bytes === String ? $util.base64.encode(message.randomNumber, 0, message.randomNumber.length) : options.bytes === Array ? Array.prototype.slice.call(message.randomNumber) : message.randomNumber;
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this AuthChallenge to JSON.
     * @function toJSON
     * @memberof AuthChallenge
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AuthChallenge.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for AuthChallenge
     * @function getTypeUrl
     * @memberof AuthChallenge
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    AuthChallenge.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/AuthChallenge";
    };

    return AuthChallenge;
})();

$root.AuthResponse = (function() {

    /**
     * Properties of an AuthResponse.
     * @exports IAuthResponse
     * @interface IAuthResponse
     * @property {Uint8Array|null} [signature] AuthResponse signature
     */

    /**
     * Constructs a new AuthResponse.
     * @exports AuthResponse
     * @classdesc Represents an AuthResponse.
     * @implements IAuthResponse
     * @constructor
     * @param {IAuthResponse=} [properties] Properties to set
     */
    function AuthResponse(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthResponse signature.
     * @member {Uint8Array} signature
     * @memberof AuthResponse
     * @instance
     */
    AuthResponse.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new AuthResponse instance using the specified properties.
     * @function create
     * @memberof AuthResponse
     * @static
     * @param {IAuthResponse=} [properties] Properties to set
     * @returns {AuthResponse} AuthResponse instance
     */
    AuthResponse.create = function create(properties) {
        return new AuthResponse(properties);
    };

    /**
     * Encodes the specified AuthResponse message. Does not implicitly {@link AuthResponse.verify|verify} messages.
     * @function encode
     * @memberof AuthResponse
     * @static
     * @param {IAuthResponse} message AuthResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified AuthResponse message, length delimited. Does not implicitly {@link AuthResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthResponse
     * @static
     * @param {IAuthResponse} message AuthResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthResponse message from the specified reader or buffer.
     * @function decode
     * @memberof AuthResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthResponse} AuthResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthResponse.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.signature = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AuthResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthResponse} AuthResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AuthResponse message.
     * @function verify
     * @memberof AuthResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AuthResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        return null;
    };

    /**
     * Creates an AuthResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AuthResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AuthResponse} AuthResponse
     */
    AuthResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.AuthResponse)
            return object;
        var message = new $root.AuthResponse();
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length >= 0)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from an AuthResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AuthResponse
     * @static
     * @param {AuthResponse} message AuthResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AuthResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this AuthResponse to JSON.
     * @function toJSON
     * @memberof AuthResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AuthResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for AuthResponse
     * @function getTypeUrl
     * @memberof AuthResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    AuthResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/AuthResponse";
    };

    return AuthResponse;
})();

$root.AuthResult = (function() {

    /**
     * Properties of an AuthResult.
     * @exports IAuthResult
     * @interface IAuthResult
     * @property {boolean|null} [success] AuthResult success
     */

    /**
     * Constructs a new AuthResult.
     * @exports AuthResult
     * @classdesc Represents an AuthResult.
     * @implements IAuthResult
     * @constructor
     * @param {IAuthResult=} [properties] Properties to set
     */
    function AuthResult(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthResult success.
     * @member {boolean} success
     * @memberof AuthResult
     * @instance
     */
    AuthResult.prototype.success = false;

    /**
     * Creates a new AuthResult instance using the specified properties.
     * @function create
     * @memberof AuthResult
     * @static
     * @param {IAuthResult=} [properties] Properties to set
     * @returns {AuthResult} AuthResult instance
     */
    AuthResult.create = function create(properties) {
        return new AuthResult(properties);
    };

    /**
     * Encodes the specified AuthResult message. Does not implicitly {@link AuthResult.verify|verify} messages.
     * @function encode
     * @memberof AuthResult
     * @static
     * @param {IAuthResult} message AuthResult message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthResult.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        return writer;
    };

    /**
     * Encodes the specified AuthResult message, length delimited. Does not implicitly {@link AuthResult.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthResult
     * @static
     * @param {IAuthResult} message AuthResult message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthResult.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthResult message from the specified reader or buffer.
     * @function decode
     * @memberof AuthResult
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthResult} AuthResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthResult.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthResult();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.success = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AuthResult message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthResult
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthResult} AuthResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthResult.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AuthResult message.
     * @function verify
     * @memberof AuthResult
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AuthResult.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        return null;
    };

    /**
     * Creates an AuthResult message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AuthResult
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AuthResult} AuthResult
     */
    AuthResult.fromObject = function fromObject(object) {
        if (object instanceof $root.AuthResult)
            return object;
        var message = new $root.AuthResult();
        if (object.success != null)
            message.success = Boolean(object.success);
        return message;
    };

    /**
     * Creates a plain object from an AuthResult message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AuthResult
     * @static
     * @param {AuthResult} message AuthResult
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AuthResult.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.success = false;
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        return object;
    };

    /**
     * Converts this AuthResult to JSON.
     * @function toJSON
     * @memberof AuthResult
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AuthResult.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for AuthResult
     * @function getTypeUrl
     * @memberof AuthResult
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    AuthResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/AuthResult";
    };

    return AuthResult;
})();

$root.RangeProofRequest = (function() {

    /**
     * Properties of a RangeProofRequest.
     * @exports IRangeProofRequest
     * @interface IRangeProofRequest
     * @property {number|Long|null} [minValue] RangeProofRequest minValue
     * @property {number|Long|null} [maxValue] RangeProofRequest maxValue
     * @property {number|null} [bitLength] RangeProofRequest bitLength
     * @property {Uint8Array|null} [c0] RangeProofRequest c0
     * @property {Uint8Array|null} [c1] RangeProofRequest c1
     * @property {Uint8Array|null} [c2] RangeProofRequest c2
     * @property {Uint8Array|null} [c3] RangeProofRequest c3
     * @property {Uint8Array|null} [rangeC1] RangeProofRequest rangeC1
     * @property {Uint8Array|null} [rangeC2] RangeProofRequest rangeC2
     */

    /**
     * Constructs a new RangeProofRequest.
     * @exports RangeProofRequest
     * @classdesc Represents a RangeProofRequest.
     * @implements IRangeProofRequest
     * @constructor
     * @param {IRangeProofRequest=} [properties] Properties to set
     */
    function RangeProofRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RangeProofRequest minValue.
     * @member {number|Long} minValue
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.minValue = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * RangeProofRequest maxValue.
     * @member {number|Long} maxValue
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.maxValue = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * RangeProofRequest bitLength.
     * @member {number} bitLength
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.bitLength = 0;

    /**
     * RangeProofRequest c0.
     * @member {Uint8Array} c0
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.c0 = $util.newBuffer([]);

    /**
     * RangeProofRequest c1.
     * @member {Uint8Array} c1
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.c1 = $util.newBuffer([]);

    /**
     * RangeProofRequest c2.
     * @member {Uint8Array} c2
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.c2 = $util.newBuffer([]);

    /**
     * RangeProofRequest c3.
     * @member {Uint8Array} c3
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.c3 = $util.newBuffer([]);

    /**
     * RangeProofRequest rangeC1.
     * @member {Uint8Array} rangeC1
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.rangeC1 = $util.newBuffer([]);

    /**
     * RangeProofRequest rangeC2.
     * @member {Uint8Array} rangeC2
     * @memberof RangeProofRequest
     * @instance
     */
    RangeProofRequest.prototype.rangeC2 = $util.newBuffer([]);

    /**
     * Creates a new RangeProofRequest instance using the specified properties.
     * @function create
     * @memberof RangeProofRequest
     * @static
     * @param {IRangeProofRequest=} [properties] Properties to set
     * @returns {RangeProofRequest} RangeProofRequest instance
     */
    RangeProofRequest.create = function create(properties) {
        return new RangeProofRequest(properties);
    };

    /**
     * Encodes the specified RangeProofRequest message. Does not implicitly {@link RangeProofRequest.verify|verify} messages.
     * @function encode
     * @memberof RangeProofRequest
     * @static
     * @param {IRangeProofRequest} message RangeProofRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RangeProofRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.minValue != null && Object.hasOwnProperty.call(message, "minValue"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.minValue);
        if (message.maxValue != null && Object.hasOwnProperty.call(message, "maxValue"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.maxValue);
        if (message.bitLength != null && Object.hasOwnProperty.call(message, "bitLength"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.bitLength);
        if (message.c0 != null && Object.hasOwnProperty.call(message, "c0"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.c0);
        if (message.c1 != null && Object.hasOwnProperty.call(message, "c1"))
            writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.c1);
        if (message.c2 != null && Object.hasOwnProperty.call(message, "c2"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.c2);
        if (message.c3 != null && Object.hasOwnProperty.call(message, "c3"))
            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.c3);
        if (message.rangeC1 != null && Object.hasOwnProperty.call(message, "rangeC1"))
            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.rangeC1);
        if (message.rangeC2 != null && Object.hasOwnProperty.call(message, "rangeC2"))
            writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.rangeC2);
        return writer;
    };

    /**
     * Encodes the specified RangeProofRequest message, length delimited. Does not implicitly {@link RangeProofRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RangeProofRequest
     * @static
     * @param {IRangeProofRequest} message RangeProofRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RangeProofRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RangeProofRequest message from the specified reader or buffer.
     * @function decode
     * @memberof RangeProofRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RangeProofRequest} RangeProofRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RangeProofRequest.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RangeProofRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.minValue = reader.uint64();
                    break;
                }
            case 2: {
                    message.maxValue = reader.uint64();
                    break;
                }
            case 3: {
                    message.bitLength = reader.uint32();
                    break;
                }
            case 4: {
                    message.c0 = reader.bytes();
                    break;
                }
            case 5: {
                    message.c1 = reader.bytes();
                    break;
                }
            case 6: {
                    message.c2 = reader.bytes();
                    break;
                }
            case 7: {
                    message.c3 = reader.bytes();
                    break;
                }
            case 8: {
                    message.rangeC1 = reader.bytes();
                    break;
                }
            case 9: {
                    message.rangeC2 = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RangeProofRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RangeProofRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RangeProofRequest} RangeProofRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RangeProofRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RangeProofRequest message.
     * @function verify
     * @memberof RangeProofRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RangeProofRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.minValue != null && message.hasOwnProperty("minValue"))
            if (!$util.isInteger(message.minValue) && !(message.minValue && $util.isInteger(message.minValue.low) && $util.isInteger(message.minValue.high)))
                return "minValue: integer|Long expected";
        if (message.maxValue != null && message.hasOwnProperty("maxValue"))
            if (!$util.isInteger(message.maxValue) && !(message.maxValue && $util.isInteger(message.maxValue.low) && $util.isInteger(message.maxValue.high)))
                return "maxValue: integer|Long expected";
        if (message.bitLength != null && message.hasOwnProperty("bitLength"))
            if (!$util.isInteger(message.bitLength))
                return "bitLength: integer expected";
        if (message.c0 != null && message.hasOwnProperty("c0"))
            if (!(message.c0 && typeof message.c0.length === "number" || $util.isString(message.c0)))
                return "c0: buffer expected";
        if (message.c1 != null && message.hasOwnProperty("c1"))
            if (!(message.c1 && typeof message.c1.length === "number" || $util.isString(message.c1)))
                return "c1: buffer expected";
        if (message.c2 != null && message.hasOwnProperty("c2"))
            if (!(message.c2 && typeof message.c2.length === "number" || $util.isString(message.c2)))
                return "c2: buffer expected";
        if (message.c3 != null && message.hasOwnProperty("c3"))
            if (!(message.c3 && typeof message.c3.length === "number" || $util.isString(message.c3)))
                return "c3: buffer expected";
        if (message.rangeC1 != null && message.hasOwnProperty("rangeC1"))
            if (!(message.rangeC1 && typeof message.rangeC1.length === "number" || $util.isString(message.rangeC1)))
                return "rangeC1: buffer expected";
        if (message.rangeC2 != null && message.hasOwnProperty("rangeC2"))
            if (!(message.rangeC2 && typeof message.rangeC2.length === "number" || $util.isString(message.rangeC2)))
                return "rangeC2: buffer expected";
        return null;
    };

    /**
     * Creates a RangeProofRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RangeProofRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RangeProofRequest} RangeProofRequest
     */
    RangeProofRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.RangeProofRequest)
            return object;
        var message = new $root.RangeProofRequest();
        if (object.minValue != null)
            if ($util.Long)
                (message.minValue = $util.Long.fromValue(object.minValue)).unsigned = true;
            else if (typeof object.minValue === "string")
                message.minValue = parseInt(object.minValue, 10);
            else if (typeof object.minValue === "number")
                message.minValue = object.minValue;
            else if (typeof object.minValue === "object")
                message.minValue = new $util.LongBits(object.minValue.low >>> 0, object.minValue.high >>> 0).toNumber(true);
        if (object.maxValue != null)
            if ($util.Long)
                (message.maxValue = $util.Long.fromValue(object.maxValue)).unsigned = true;
            else if (typeof object.maxValue === "string")
                message.maxValue = parseInt(object.maxValue, 10);
            else if (typeof object.maxValue === "number")
                message.maxValue = object.maxValue;
            else if (typeof object.maxValue === "object")
                message.maxValue = new $util.LongBits(object.maxValue.low >>> 0, object.maxValue.high >>> 0).toNumber(true);
        if (object.bitLength != null)
            message.bitLength = object.bitLength >>> 0;
        if (object.c0 != null)
            if (typeof object.c0 === "string")
                $util.base64.decode(object.c0, message.c0 = $util.newBuffer($util.base64.length(object.c0)), 0);
            else if (object.c0.length >= 0)
                message.c0 = object.c0;
        if (object.c1 != null)
            if (typeof object.c1 === "string")
                $util.base64.decode(object.c1, message.c1 = $util.newBuffer($util.base64.length(object.c1)), 0);
            else if (object.c1.length >= 0)
                message.c1 = object.c1;
        if (object.c2 != null)
            if (typeof object.c2 === "string")
                $util.base64.decode(object.c2, message.c2 = $util.newBuffer($util.base64.length(object.c2)), 0);
            else if (object.c2.length >= 0)
                message.c2 = object.c2;
        if (object.c3 != null)
            if (typeof object.c3 === "string")
                $util.base64.decode(object.c3, message.c3 = $util.newBuffer($util.base64.length(object.c3)), 0);
            else if (object.c3.length >= 0)
                message.c3 = object.c3;
        if (object.rangeC1 != null)
            if (typeof object.rangeC1 === "string")
                $util.base64.decode(object.rangeC1, message.rangeC1 = $util.newBuffer($util.base64.length(object.rangeC1)), 0);
            else if (object.rangeC1.length >= 0)
                message.rangeC1 = object.rangeC1;
        if (object.rangeC2 != null)
            if (typeof object.rangeC2 === "string")
                $util.base64.decode(object.rangeC2, message.rangeC2 = $util.newBuffer($util.base64.length(object.rangeC2)), 0);
            else if (object.rangeC2.length >= 0)
                message.rangeC2 = object.rangeC2;
        return message;
    };

    /**
     * Creates a plain object from a RangeProofRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RangeProofRequest
     * @static
     * @param {RangeProofRequest} message RangeProofRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RangeProofRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.minValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.minValue = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.maxValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.maxValue = options.longs === String ? "0" : 0;
            object.bitLength = 0;
            if (options.bytes === String)
                object.c0 = "";
            else {
                object.c0 = [];
                if (options.bytes !== Array)
                    object.c0 = $util.newBuffer(object.c0);
            }
            if (options.bytes === String)
                object.c1 = "";
            else {
                object.c1 = [];
                if (options.bytes !== Array)
                    object.c1 = $util.newBuffer(object.c1);
            }
            if (options.bytes === String)
                object.c2 = "";
            else {
                object.c2 = [];
                if (options.bytes !== Array)
                    object.c2 = $util.newBuffer(object.c2);
            }
            if (options.bytes === String)
                object.c3 = "";
            else {
                object.c3 = [];
                if (options.bytes !== Array)
                    object.c3 = $util.newBuffer(object.c3);
            }
            if (options.bytes === String)
                object.rangeC1 = "";
            else {
                object.rangeC1 = [];
                if (options.bytes !== Array)
                    object.rangeC1 = $util.newBuffer(object.rangeC1);
            }
            if (options.bytes === String)
                object.rangeC2 = "";
            else {
                object.rangeC2 = [];
                if (options.bytes !== Array)
                    object.rangeC2 = $util.newBuffer(object.rangeC2);
            }
        }
        if (message.minValue != null && message.hasOwnProperty("minValue"))
            if (typeof message.minValue === "number")
                object.minValue = options.longs === String ? String(message.minValue) : message.minValue;
            else
                object.minValue = options.longs === String ? $util.Long.prototype.toString.call(message.minValue) : options.longs === Number ? new $util.LongBits(message.minValue.low >>> 0, message.minValue.high >>> 0).toNumber(true) : message.minValue;
        if (message.maxValue != null && message.hasOwnProperty("maxValue"))
            if (typeof message.maxValue === "number")
                object.maxValue = options.longs === String ? String(message.maxValue) : message.maxValue;
            else
                object.maxValue = options.longs === String ? $util.Long.prototype.toString.call(message.maxValue) : options.longs === Number ? new $util.LongBits(message.maxValue.low >>> 0, message.maxValue.high >>> 0).toNumber(true) : message.maxValue;
        if (message.bitLength != null && message.hasOwnProperty("bitLength"))
            object.bitLength = message.bitLength;
        if (message.c0 != null && message.hasOwnProperty("c0"))
            object.c0 = options.bytes === String ? $util.base64.encode(message.c0, 0, message.c0.length) : options.bytes === Array ? Array.prototype.slice.call(message.c0) : message.c0;
        if (message.c1 != null && message.hasOwnProperty("c1"))
            object.c1 = options.bytes === String ? $util.base64.encode(message.c1, 0, message.c1.length) : options.bytes === Array ? Array.prototype.slice.call(message.c1) : message.c1;
        if (message.c2 != null && message.hasOwnProperty("c2"))
            object.c2 = options.bytes === String ? $util.base64.encode(message.c2, 0, message.c2.length) : options.bytes === Array ? Array.prototype.slice.call(message.c2) : message.c2;
        if (message.c3 != null && message.hasOwnProperty("c3"))
            object.c3 = options.bytes === String ? $util.base64.encode(message.c3, 0, message.c3.length) : options.bytes === Array ? Array.prototype.slice.call(message.c3) : message.c3;
        if (message.rangeC1 != null && message.hasOwnProperty("rangeC1"))
            object.rangeC1 = options.bytes === String ? $util.base64.encode(message.rangeC1, 0, message.rangeC1.length) : options.bytes === Array ? Array.prototype.slice.call(message.rangeC1) : message.rangeC1;
        if (message.rangeC2 != null && message.hasOwnProperty("rangeC2"))
            object.rangeC2 = options.bytes === String ? $util.base64.encode(message.rangeC2, 0, message.rangeC2.length) : options.bytes === Array ? Array.prototype.slice.call(message.rangeC2) : message.rangeC2;
        return object;
    };

    /**
     * Converts this RangeProofRequest to JSON.
     * @function toJSON
     * @memberof RangeProofRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RangeProofRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RangeProofRequest
     * @function getTypeUrl
     * @memberof RangeProofRequest
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RangeProofRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RangeProofRequest";
    };

    return RangeProofRequest;
})();

$root.RangeProofResult = (function() {

    /**
     * Properties of a RangeProofResult.
     * @exports IRangeProofResult
     * @interface IRangeProofResult
     * @property {boolean|null} [success] RangeProofResult success
     */

    /**
     * Constructs a new RangeProofResult.
     * @exports RangeProofResult
     * @classdesc Represents a RangeProofResult.
     * @implements IRangeProofResult
     * @constructor
     * @param {IRangeProofResult=} [properties] Properties to set
     */
    function RangeProofResult(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RangeProofResult success.
     * @member {boolean} success
     * @memberof RangeProofResult
     * @instance
     */
    RangeProofResult.prototype.success = false;

    /**
     * Creates a new RangeProofResult instance using the specified properties.
     * @function create
     * @memberof RangeProofResult
     * @static
     * @param {IRangeProofResult=} [properties] Properties to set
     * @returns {RangeProofResult} RangeProofResult instance
     */
    RangeProofResult.create = function create(properties) {
        return new RangeProofResult(properties);
    };

    /**
     * Encodes the specified RangeProofResult message. Does not implicitly {@link RangeProofResult.verify|verify} messages.
     * @function encode
     * @memberof RangeProofResult
     * @static
     * @param {IRangeProofResult} message RangeProofResult message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RangeProofResult.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        return writer;
    };

    /**
     * Encodes the specified RangeProofResult message, length delimited. Does not implicitly {@link RangeProofResult.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RangeProofResult
     * @static
     * @param {IRangeProofResult} message RangeProofResult message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RangeProofResult.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RangeProofResult message from the specified reader or buffer.
     * @function decode
     * @memberof RangeProofResult
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RangeProofResult} RangeProofResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RangeProofResult.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RangeProofResult();
        while (reader.pos < end) {
            var tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.success = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RangeProofResult message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RangeProofResult
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RangeProofResult} RangeProofResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RangeProofResult.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RangeProofResult message.
     * @function verify
     * @memberof RangeProofResult
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RangeProofResult.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        return null;
    };

    /**
     * Creates a RangeProofResult message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RangeProofResult
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RangeProofResult} RangeProofResult
     */
    RangeProofResult.fromObject = function fromObject(object) {
        if (object instanceof $root.RangeProofResult)
            return object;
        var message = new $root.RangeProofResult();
        if (object.success != null)
            message.success = Boolean(object.success);
        return message;
    };

    /**
     * Creates a plain object from a RangeProofResult message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RangeProofResult
     * @static
     * @param {RangeProofResult} message RangeProofResult
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RangeProofResult.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.success = false;
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        return object;
    };

    /**
     * Converts this RangeProofResult to JSON.
     * @function toJSON
     * @memberof RangeProofResult
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RangeProofResult.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RangeProofResult
     * @function getTypeUrl
     * @memberof RangeProofResult
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RangeProofResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RangeProofResult";
    };

    return RangeProofResult;
})();

module.exports = $root;
