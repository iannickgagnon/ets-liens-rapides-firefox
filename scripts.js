/**
 * Copie le lien hypertexte associé à l'élément parent d'un bouton dans le presse-papiers.
 * Change la couleur de fond du bouton pour indiquer le succès et la rétablit après un court délai.
 *
 * @param {HTMLButtonElement} button - L'élément bouton qui déclenche l'action de copie.
 * @returns {void}
 */
function copyLink(button) {
  
  // Récupérer le lien associé au bouton
  const link = button.parentElement.querySelector('a').href;

  // Stocker les propriétés d'origine
  const originalText = button.textContent;
  const originalColor = button.style.color;
  const originalBackgroundColor = button.style.backgroundColor;

  navigator.clipboard.writeText(link).then(() => {
    
    // Changer le texte et la couleur du bouton pour indiquer le succès
    button.textContent = "✔ Copié";
    button.style.backgroundColor = "limegreen";
    button.style.color = "white";

    // Rétablir le texte et la couleur d'origine après un court délai
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = originalColor;
      button.style.color = originalBackgroundColor;
    }, 500);

  }).catch((err) => {

    // Signaler l'erreur dans la console
    console.error("Erreur lors de la copie :", err);

    // Signaler l'erreur à l'utilisateur
    button.textContent = "❌ Erreur";
    button.style.backgroundColor = "crimson";
    button.style.color = "white";

    // Rétablir le texte et la couleur d'origine après un court délai
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = originalColor;
      button.style.color = originalBackgroundColor;
    }, 500);

  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Ajouter un écouteur d'événements à chaque bouton de copie
  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', () => copyLink(button));
  });
});
