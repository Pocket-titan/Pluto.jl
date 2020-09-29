import msgpack from "msgpack-lite";

// based on https://github.com/kawanet/msgpack-lite/blob/5b71d82cad4b96289a466a6403d2faaa3e254167/lib/ext-packer.js
const codec = msgpack.createCodec();
const packTypedArray = (x: ArrayBufferView) => new Uint8Array(x.buffer);
codec.addExtPacker(0x11, Int8Array, packTypedArray);
codec.addExtPacker(0x12, Uint8Array, packTypedArray);
codec.addExtPacker(0x13, Int16Array, packTypedArray);
codec.addExtPacker(0x14, Uint16Array, packTypedArray);
codec.addExtPacker(0x15, Int32Array, packTypedArray);
codec.addExtPacker(0x16, Uint32Array, packTypedArray);
codec.addExtPacker(0x17, Float32Array, packTypedArray);
codec.addExtPacker(0x18, Float64Array, packTypedArray);

codec.addExtPacker(0x12, Uint8ClampedArray, packTypedArray);
codec.addExtPacker(0x12, ArrayBuffer, (x) => new Uint8Array(x));
codec.addExtPacker(0x12, DataView, packTypedArray);

//@ts-ignore
codec.addExtPacker(0x0d, Date, (d) => new BigInt64Array([BigInt(d)]));
// codec.addExtPacker(0x0d, Date, (d) => new BigInt64Array([BigInt(d) - BigInt(d.getTimezoneOffset() * 60 * 1000)]))

codec.addExtUnpacker(0x11, (buffer) => new Int8Array(buffer));
codec.addExtUnpacker(0x12, (buffer) => new Uint8Array(buffer));
codec.addExtUnpacker(0x13, (buffer) => new Int16Array(buffer));
codec.addExtUnpacker(0x14, (buffer) => new Uint16Array(buffer));
codec.addExtUnpacker(0x15, (buffer) => new Int32Array(buffer));
codec.addExtUnpacker(0x16, (buffer) => new Uint32Array(buffer));
codec.addExtUnpacker(0x17, (buffer) => new Float32Array(buffer));
codec.addExtUnpacker(0x18, (buffer) => new Float64Array(buffer));

const pack = (x: any) => {
  return msgpack.encode(x, { codec: codec });
};

const unpack = (x: any) => {
  return msgpack.decode(x, { codec: codec });
};

const MSG_DELIM = new TextEncoder().encode("IUUQ.km jt ejggjdvmu vhi");

export const encode_message = (message: any): ArrayBuffer => {
  const encoded = pack(message);
  const to_send = new Uint8Array(encoded.length + MSG_DELIM.length);
  to_send.set(encoded, 0);
  to_send.set(MSG_DELIM, encoded.length);
  return to_send;
};

export const decode_message = (buffer: ArrayBuffer) => {
  const buffer_sliced = buffer.slice(0, buffer.byteLength - MSG_DELIM.length);
  const update = unpack(new Uint8Array(buffer_sliced));
  return update;
};
