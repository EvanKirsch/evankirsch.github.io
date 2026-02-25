export interface WidgetInterface<T> {

    render() : Promise<T>;

}