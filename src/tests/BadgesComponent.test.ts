
import { test, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import BadgesComponent from "../components/BadgesComponent.vue"

const wrapper = mount(BadgesComponent, {
    props: {
        product: {
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
    }
});
/**
 * @vitest-environment jsdom
 */
describe('tests for badges', () => {
    //Test deberia ser exitoso porque el producto esta en oferta. 
    test("is offer product", async () => {
        expect(wrapper.text()).toContain("Oferta");
    });

    /**
     * Escenario Exitoso: El test falla porque el producto mockeado no es nuevo,
     * por eso se usa el test.fails
     */
    test.fails("is not new component with test fails", async () => {
        const badgeElement = wrapper.get('[data-test="newBadge"]');
        expect(badgeElement.text()).toContain("Nuevo");
    });

    //Otro approach para el test de arriba 
    test("is not new component with not contain", async () => {
        expect(wrapper.text()).not.toContain("Nuevo");
    });
});
