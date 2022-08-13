class PauseMenu {
  constructor({ progress, onComplete }) {
    this.onComplete = onComplete;
    this.progress = progress;
  }

  getOptions(pageKey, currentPizzaId = null) {
    const backOptions = {
      label: "Back",
      descriptions: "Go Back.",
      handler: () => {
        this.menu.setOptions(this.getOptions("root"));
      },
    };
    if (pageKey === "root") {
      return [
        {
          label: "Team",
          descriptions: "Change pizza Lineup",
          handler: () => {
            this.menu.setOptions(this.getOptions("team"));
          },
        },
        {
          label: "Save",
          descriptions: "Save your Progress",
          handler: () => {
            this.progress.save();
            this.close();
          },
        },
        {
          label: "Items",
          descriptions: "See your items",
          handler: () => {
            this.menu.setOptions(this.getOptions("item"));
          },
        },
        {
          label: "Close",
          descriptions: "Close the Pause Menu",
          handler: () => {
            this.close();
          },
        },
      ];
    } else if (pageKey === "team") {
      let lineupPizza = [];
      for (let i = 0; i < 4; i++) {
        const id = playerState.lineup[i];

        if (id) {
          const { pizzaId } = playerState.pizzas[id];
          const base = pizzas[pizzaId];
          lineupPizza.push({
            label: base.name,
            descriptions: base.descriptions,
            handler: () => {
              this.menu.setOptions(this.getOptions("Switch", id));
            },
          });
        } else {
          lineupPizza.push({
            label: "__Empty__",
            descriptions: "You have no pizza at this position.",
            handler: () => {
              this.menu.setOptions(this.getOptions("unEquippedPizza"));
            },
          });
        }
      }

      return [...lineupPizza, backOptions];
    } else if (pageKey === "Switch") {
      //Faire un cas quand ya personne

      const unequiped = Object.keys(playerState.pizzas)
        .filter((id) => {
          return playerState.lineup.indexOf(id) === -1;
        })
        .map((id) => {
          const { pizzaId } = playerState.pizzas[id];
          const base = pizzas[pizzaId];
          return {
            label: `Switch ${base.name}`,
            descriptions: base.descriptions,
            handler: () => {
              playerState.swapLineup(currentPizzaId, id);
              this.menu.setOptions(this.getOptions("root"));
            },
          };
        });

      return [
        {
          label: `Lead the team`,
          descriptions: "undefined",
          handler: () => {
            playerState.moveToFront(currentPizzaId);
            this.menu.setOptions(this.getOptions("root"));
          },
        },
        {
          label: "Statistical",
          descriptions: "",
          handler: () => {
            this.menu.setOptions(
              this.getOptions("statistique", currentPizzaId)
            );
          },
        },
        ...unequiped,
        backOptions,
      ];
    } else if (pageKey === "unEquippedPizza") {
      const unequiped = this.pizzaUnequipped((id) => {
        playerState.lineup.push(id);
        utils.createCustomEvent("lineupChanged");
      });

      return [...unequiped, backOptions];
    } else if (pageKey === "statistique") {
      const currentPizza = playerState.pizzas[currentPizzaId];
      return [
        {
          label: `Level: ${currentPizza.level}`,
          descriptions: "",
          disable: true,
          handler: () => {},
        },
        {
          label: `Hp: ${currentPizza.hp} / ${currentPizza.maxHp}`,
          descriptions: "",
          disable: true,
          handler: () => {},
        },
        {
          label: `Attack: ${currentPizza.attack}`,
          descriptions: "",
          disable: true,
          handler: () => {},
        },
        {
          label: `Defense: ${currentPizza.defense}`,
          descriptions: "",
          disable: true,
          handler: () => {},
        },
        {
          label: `Attack.Spe: ${currentPizza.attackSpe}`,
          descriptions: "",
          disable: true,
          handler: () => {},
        },
        {
          label: `Speed: ${currentPizza.speed}`,
          descriptions: "",
          disable: true,
          handler: () => {},
        },
        {
          label: `Xp: ${currentPizza.xp} / ${currentPizza.maxXp}`,
          descriptions: "",
          disable: true,
          handler: () => {},
        },

        backOptions,
      ];
    } else if (pageKey === "item") {
      let quantityItems = {};
      playerState.items.forEach((item) => {
        if (!quantityItems[item.actionsId]) {
          quantityItems[item.actionsId] = {
            actionsId: item.actionsId,
            quantity: 1,
            instanceId: item.instanceId,
          };
        } else {
          quantityItems[item.actionsId].quantity += 1;
        }
      });

      const itemsList = Object.keys(quantityItems).map((actionId) => {
        const itemConfig = window.items[actionId];
        const quantityItem = quantityItems[actionId];
        return {
          label: itemConfig.name,
          descriptions: itemConfig.descriptions,
          disable: true,
          right: () => {
            return `${quantityItem.quantity}x`;
          },
          handler: () => {},
        };
      });

      return [...itemsList, backOptions];
    }
  }

  pizzaUnequipped(cbHandler) {
    const unequiped = Object.keys(playerState.pizzas)
      .filter((id) => {
        return playerState.lineup.indexOf(id) === -1;
      })
      .map((id) => {
        const { pizzaId } = playerState.pizzas[id];
        const base = pizzas[pizzaId];
        return {
          label: `Equiped ${base.name}`,
          descriptions: base.descriptions,
          handler: () => {
            cbHandler(id);
            this.close();
          },
        };
      });

    return unequiped;
  }

  close() {
    this.esc?.unbind();
    this.menu.end();
    this.element.remove();
    this.onComplete();
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("overlayMenu");
    this.element.innerHTML = `
            <h2>Pause Menu</h2>
        `;
  }

  async init(container) {
    this.createElement();
    this.menu = new KeyboardMenu({
      descriptionsContainer: container,
    });
    this.menu.init(this.element);
    this.menu.setOptions(this.getOptions("root"));

    container.appendChild(this.element);

    await utils.wait(200);

    this.esc = new KeyPressListener(
      "&",
      () => {
        this.close();
      },
      { once: true }
    );
  }
}
