export type WsMessageBase<T, D> = {
    type: T;
    data: D;
}