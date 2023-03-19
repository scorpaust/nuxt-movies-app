export default defineNuxtRouteMiddleware((to, from) => {
    const UserIsLoggedIn = false;
    if (!UserIsLoggedIn)
    {
        return navigateTo("/login")
    }
})
