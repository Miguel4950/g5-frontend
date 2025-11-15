const roleMap = {
  1: "student",
  2: "librarian",
  3: "admin",
};

export function resolveRole(user) {
  if (!user) return "guest";
  return (
    roleMap[user.id_tipo_usuario] ||
    user.rol ||
    user.role ||
    (user.tipo_usuario && user.tipo_usuario.toLowerCase()) ||
    "student"
  );
}
