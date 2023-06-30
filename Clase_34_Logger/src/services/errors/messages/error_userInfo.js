export const generateError = (user) => {
    return `Uno o mas campos del usuario estan incompletos o no son validos.
    Lista de propiedades requeridas:
    * first_name : String -> Recibe: ${user.first_name}
    * last_name  : String -> Recibe: ${user.last_name}
    * email      : String -> Recibe: ${user.email}
    * password   : String -> Recibe: ${typeof user.password} -> ${user.password.length}
    `
};