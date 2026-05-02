import { describe, expect, it } from "vitest";
import { AllArgsConstructor, Builder, Data, Getter, Setter, autogen, autogenDataBuilder } from "../src/index";

@Data()
@Builder()
@AllArgsConstructor()
class Wiring {
    @Getter()
    @Setter()
    name: string = "";

    @Getter()
    @Setter()
    count: number = 0;
}

const WiringModel = autogen(Wiring, { builder: true, data: true } as const);

describe("autogen typing (runtime smoke)", () => {
    it("preserves builder and @Data instance methods", () => {
        const w = WiringModel.builder().name("a").count(2).build();
        expect(w.getName()).toBe("a");
        expect(w.getCount()).toBe(2);
        w.setName("b");
        expect(w.getName()).toBe("b");
        expect(typeof w.toString).toBe("function");
    });

    it("autogenDataBuilder matches @Data + @Builder", () => {
        @Data()
        @Builder()
        class Box {
            @Getter()
            @Setter()
            v: string = "";
        }
        const BoxModel = autogenDataBuilder(Box);
        const b = BoxModel.builder().v("ok").build();
        expect(b.getV()).toBe("ok");
    });
});
