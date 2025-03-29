export default {
    methods: {
        contribution_link(uuid) {
            return `/contribution/${uuid}`;
        },
        contribution_link_discuss(uuid) {
            return `/contribution/${uuid}/discuss`
        },
        contribution_link_edit_request(uuid) {
            return `/contribution/${uuid}/edit_request`
        },
        user_doc(name) {
            return `사용자:${name}`
        },
        doc_action_link(name, prefix) {
            return `/${encodeURIComponent(prefix)}/${encodeURIComponent(name)}`
        }
    }
}