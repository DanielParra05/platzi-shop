import { test, assert, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import App from "../App.vue";


const products = [{
  name: "Camara",
  price: 35000,
  stock: 4,
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
  new: true,
  offer: true,
}];

const wrapper = mount(App);
wrapper.vm.products = products; //As there is not any current way to do so by vue test utils

describe('tests for app', () => {
  test("mount component", async () => {
    expect(App).toBeTruthy();
  });

  test("Apply Discount code", async () => {
    //Arrange
    await wrapper.get('#discountCodeInput').setValue('DANIEL');
    //Act
    await wrapper.get('#discountCodeInput').trigger('keyup.enter');
    //Asserts
    expect(wrapper.get('.description__price').text()).toEqual(new Intl.NumberFormat("es-CO").format(17500));
  });

  test("Checking cart after adding a product", async () => {
    //Act
    await wrapper.get('#addCartButton').trigger('click');
    //Assert
    expect(wrapper.get(".cart").text()).toContain("Carro (1)");
  });

  test("Checking description when stock == 2", async () => {
    //Act
    await wrapper.get('#addCartButton').trigger('click');
    //Assert
    expect(wrapper.get(".description__status").text()).toContain("Producto esta por terminarse");
  });

});