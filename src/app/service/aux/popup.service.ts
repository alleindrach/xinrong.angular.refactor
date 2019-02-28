import {
  Injectable,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  Type
} from "@angular/core";
import { NgElement, WithProperties } from "@angular/elements";
import { PopupComponent } from "src/app/component/popup/popup/popup.component";
import { createCustomElement } from "@angular/elements";
import { IPopupComponent } from "src/app/component/popup/popup/popup.base";
@Injectable({
  providedIn: "root"
})
export class PopupService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  registerCustomElement(injector: any, component: any, tag: string): void {
    const customElement = createCustomElement(component, { injector });
    // Register the custom element with the browser.
    let existCustomElement = customElements.get(tag) as any;
    if (!existCustomElement) customElements.define(tag, customElement);
  }
  // Previous dynamic-loading method required you to set up infrastructure
  // before adding the popup to the DOM.
  showAsComponent(message: string) {
    // Create element
    const popup = document.createElement("popup-component");

    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      PopupComponent
    );
    const popupComponentRef = factory.create(this.injector, [], popup);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(popupComponentRef.hostView);

    // Listen to the close event
    popupComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupComponentRef.hostView);
    });

    // Set the message
    popupComponentRef.instance.message = message;

    // Add to the DOM
    document.body.appendChild(popup);
  }

  // This uses the new custom-element method to add the popup to the DOM.
  showAsElement(
    injector: any,
    ComponentType: Type<any>,
    tag: string,
    data: any
  ) :NgElement &
  WithProperties<IPopupComponent> {
    // Create element
    const customElement = createCustomElement(ComponentType, { injector });
    // Register the custom element with the browser.
    let existCustomElement = customElements.get(tag) as any;

    if (!existCustomElement) customElements.define(tag, customElement);

    const popupEl: NgElement &
      WithProperties<IPopupComponent> = document.createElement(tag) as any;

    // Listen to the close event
    popupEl.addEventListener("closed", () =>
      document.body.removeChild(popupEl)
    );

    // Set the message
    popupEl.data = data;

    // Add to the DOM
    document.body.appendChild(popupEl);
    
    return popupEl;
  }
}
