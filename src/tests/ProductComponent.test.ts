import { test, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductComponent from "../components/ProductComponent.vue"


const product1 = {
  name: "Camara",
  price: 35000,
  stock: 0,
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt atqu",
  images: [
    {
      image: "",
      thumbnail: "",
    },
    {
      image: "",
      thumbnail: "",
    },
  ],
  new: false,
  offer: true,
}

const product2 = {
  name: "Camara",
  price: 35000,
  stock: 5,
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt atqu",
  images: [
    {
      image: "",
      thumbnail: "",
    },
    {
      image: "",
      thumbnail: "",
    },
  ],
  new: false,
  offer: true,
}

const DISABLED = "disabled";

describe('tests for product1', () => {
  const wrapper = mount(ProductComponent, {
    props: { product: product1 }
  });

  test("mount component", async () => {
    expect(ProductComponent).toBeTruthy();
  });

  test("Sticker cuando el stock es mayor a cero", () => {
    expect(wrapper.get("#stockEmoji").text()).toContain("😒");
  });

  test("Estilo rojo cuando el stock es 0", () => {
    var styles: string = wrapper.get(".description__price").attributes()["style"];
    expect(styles).toContain("color: rgb(188, 30, 67)");
  });

  test("Boton desactivado cuando el stock es 0", () => {
    expect(wrapper.get("#addCartButton").attributes()[DISABLED]).toBeDefined();
  });
});

describe('tests for product2', () => {
  const wrapper = mount(ProductComponent, {
    props: { product: product2 }
  });
  test("Boton activado cuando stock mayor a 0", () => {
    expect(wrapper.get("#addCartButton").attributes()[DISABLED]).toBeUndefined();
  });
});


