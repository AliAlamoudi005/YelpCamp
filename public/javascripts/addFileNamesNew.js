function previewMultiple(event) {
  var images = document.getElementById("image");
  var number = images.files.length;
  var container = document.getElementById("formFile");

  // Clear previous previews
  container.innerHTML = "";

  for (i = 0; i < number; i++) {
    var urls = URL.createObjectURL(event.target.files[i]);
    container.innerHTML += '<img src="' + urls + '">';
  }
}

// Add event listener instead of inline onchange
document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("image");
  if (imageInput) {
    imageInput.addEventListener("change", previewMultiple);
  }
});
