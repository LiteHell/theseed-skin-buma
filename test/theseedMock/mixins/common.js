export default {
    methods: {
        contribution_link(uuid) {
            return `/contribution/${uuid}`;
        },
        user_doc(name) {
            return `사용자:${name}`
        },
        doc_action_link(name, prefix) {
            return `/${encodeURIComponent(prefix)}/${encodeURIComponent(name)}`
        }
    }
}