export default class Animator {
  private elementsToAnimate: NodeListOf<Element>;
  constructor() {
    this.elementsToAnimate = document.querySelectorAll("[class*='maa-']");
    this.init();
  }

  private init() {
    const styleElement = document.createElement("style");

    this.elementsToAnimate.forEach((el: Element) => {
      const classList = el.classList;
      Array.from(classList).forEach((className) => {
        if (className.includes("maa-")) {
          //   const [property, value] = className.split("-").slice(2); // Split className into property and value
          const result = className.split("-");
          let propertyWithBracket: string, valueWithBracket: string;

          if (result.length === 4) {
            [propertyWithBracket, valueWithBracket] = className
              .split("-")
              .slice(2);
          } else {
            [propertyWithBracket, valueWithBracket] = className
              .split("-")
              .slice(1);
          }

          const property = propertyWithBracket.split("-")[0]; // Extract property (e.g., translateX)
          if (property === "transition") {
            // Handle transition property separately
            const transitionValue = valueWithBracket.slice(1, -1); // Remove the leading '[' and trailing ']' to get the value (e.g., 0.5s ease)
            // this.applyTransition(el, transitionValue);
            this.injectRule(
              styleElement,
              className,
              `transition: ${transitionValue};`
            );
          } else {
            const propertyMap: Record<string, string> = {
              translate: "translate",
              translateX: "translateX",
              translateY: "translateY",
              rotate: "rotate",
              rotateX: "rotateX",
              rotateY: "rotateY",
              scale: "scale",
              scaleX: "scaleX",
              scaleY: "scaleY",
              // Add more properties as needed
            };
            const value = valueWithBracket.slice(1, -1); // Remove the leading '[' and trailing ']' to get the value (e.g., 300px)
            // this.applyTransformation(el, property, value);
            if (propertyMap[property]) {
              // Apply the transformation to the element style
              if (className.startsWith("maa-")) {
                let transformValue = `${propertyMap[property]}(${value})`;

                this.injectRule(
                  styleElement,
                  className,
                  `transform: ${transformValue};`
                );
              } else if (className.startsWith("-maa-")) {
                let transformValue = `${propertyMap[property]}(-${value})`;
                this.injectRule(
                  styleElement,
                  className,
                  `transform: ${transformValue};`
                );
              }
            }
          }
        }
      });
    });

    // Append the style element to the document head
    document.head.appendChild(styleElement);
  }

  private escapeSpecialCharacters(className: string) {
    // Use the replace method with regular expressions
    // to replace '[' with '\[' and ']' with '\]'
    const escapedClassName = className
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]")
      .replace(/\./g, "\\.")
      .replace(/\%/g, "\\%");
    return escapedClassName;
  }

  private injectRule(
    styleElement: HTMLStyleElement,
    className: string,
    rule: string
  ) {
    styleElement.appendChild(
      document.createTextNode(
        `.${this.escapeSpecialCharacters(className)} { ${rule} }`
      )
    );
  }
}
