/**
 * @name setUpstreams
 * @desc This is helper for backward compatibility of already existed OAuth servers
 *      such as 'github-auth' and 'live oauth server', which don't contain 'upstreams', but
 *      only contains redundant 'upstream-url', what might be deprecated in future.
 * @param {*} el -
 *
 * @return {Object} real upstream Object with 'balancing' & 'targets' or empty Object as a fallback.
 */
export default function setUpstreams (el) {
  return el ? getUpstreams(el) : {}
};

function getUpstreams (el) {
  return el.upstreams ? el.upstreams : {}
};
