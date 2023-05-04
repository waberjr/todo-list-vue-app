<template>
    <header class="bg-gray-50 dark:bg-gray-900">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <RouterLink :to="{ name: 'home' }" class="-m-1.5 p-1.5">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
                </RouterLink>
            </div>

            <div class="lg:flex lg:flex-1 lg:justify-end">
                <RouterLink :to="{ name: 'login' }" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Entrar
                </RouterLink>
            </div>
        </nav>
    </header>
</template>