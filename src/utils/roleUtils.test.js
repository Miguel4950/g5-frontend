import { describe, it, expect } from "vitest";
import { resolveRole } from "./roleUtils";

describe("resolveRole", () => {
  it("detects student by id_tipo_usuario", () => {
    expect(resolveRole({ id_tipo_usuario: 1 })).toBe("student");
  });

  it("detects librarian by id_tipo_usuario", () => {
    expect(resolveRole({ id_tipo_usuario: 2 })).toBe("librarian");
  });

  it("falls back to role string", () => {
    expect(resolveRole({ role: "admin" })).toBe("admin");
  });

  it("supports tipo_usuario text", () => {
    expect(resolveRole({ tipo_usuario: "Bibliotecario" })).toBe("bibliotecario");
  });

  it("returns guest when missing user", () => {
    expect(resolveRole(null)).toBe("guest");
  });
});
