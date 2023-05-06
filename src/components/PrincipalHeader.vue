<template>
    <header>
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <RouterLink :to="{ name: 'home' }" class="-m-1.5 p-1.5">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
                </RouterLink>
            </div>

            <div class="lg:flex lg:flex-1 lg:justify-end">
                <div v-if="user.id">
                    <div class="text-end text-white text-sm">
                        Olá, {{ user.first_name }}
                    </div>

                    <div class="text-white">
                        <RouterLink :to="{ name: 'home' }"
                            class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            Home |
                        </RouterLink>

                        <RouterLink :to="{ name: 'profile' }"
                            class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            Meu perfil |
                        </RouterLink>

                        <RouterLink to="/" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            Logout
                        </RouterLink>
                    </div>
                </div>

                <div v-else>
                    <RouterLink :to="{ name: 'login' }"
                        class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                        Entrar
                    </RouterLink>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
}
</script>