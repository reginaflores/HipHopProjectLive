// Artwork lightbox: large image, title/artist info, and a link out to the Met.

function escapeHtml(text) {
  return String(text || "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Old collection URLs (/collection/the-collection-online/search/123) -> current object page
function metObjectUrl(href) {
  var id = String(href || "").replace(/\/+$/, "").split("/").pop();
  return /^\d+$/.test(id) ? "https://www.metmuseum.org/art/collection/search/" + id : href;
}

function showArtwork(image) {
  var large = image.large || image.thumb.replace("web-thumb", "web-large").replace(/^http:/, "https:");
  var artist = image.primaryArtistNameOnly || "";
  var html =
    '<div class="artwork-box">' +
      '<a href="' + metObjectUrl(image.href) + '" target="_blank" rel="noopener">' +
        '<img class="artwork-image" src="' + large + '" alt="' + escapeHtml(image.title) + '">' +
      '</a>' +
      '<div class="artwork-info">' +
        '<h2>' + escapeHtml(image.title) + '</h2>' +
        (artist ? '<p class="artwork-artist">' + escapeHtml(artist) + '</p>' : '') +
        (image.type || image.date ? '<p class="artwork-type">' + escapeHtml([image.type, image.date].filter(Boolean).join(', ')) + '</p>' : '') +
        (image.location ? '<p class="artwork-location">' + escapeHtml(image.location) + '</p>' : '') +
        (image.imageCredit ? '<p class="artwork-credit">Image: <a href="' + image.imageCreditUrl + '" target="_blank" rel="noopener">' + escapeHtml(image.imageCredit) + '</a></p>' : '') +
        '<a class="artwork-link" href="' + metObjectUrl(image.href) + '" target="_blank" rel="noopener">View at The Met &rarr;</a>' +
      '</div>' +
    '</div>';
  $.featherlight($(html));
}
