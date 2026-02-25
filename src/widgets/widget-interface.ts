export interface WidgetInterface<T> {

    renderOn(targetEltId : String) : Promise<T>;

}