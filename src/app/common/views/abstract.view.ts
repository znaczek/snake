import {Provide} from '../di/provide';

@Provide({
    singleton: false,
})
export abstract class AbstractView {
    public abstract start(payload?: any): void;
    public abstract close(): void;
}
