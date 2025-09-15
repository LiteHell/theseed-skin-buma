<template>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p>
                    <span v-html="$store.state.config['wiki.copyright_text']" />
                    <span v-html="$store.state.config['wiki.footer_text']" />

                    theseed-skin-buma by LiteHell, the seed engine by theseed.io <br />
                    theseed-skin-buma is distributed under
                    <a href="https://www.gnu.org/licenses/gpl-3.0.html">GNU General Public License Version 3</a>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {}
</script>