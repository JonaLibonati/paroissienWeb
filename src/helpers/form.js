
export const submit = (e, loadingForm) => {
  e.preventDefault();

  const state = {
    fname: e.target.elements.firstname.value,
    lname: e.target.elements.lastname.value,
    eMail: e.target.elements.eMail.value,
    subject: e.target.elements.subject.value,
    message: e.target.elements.message.value,
  }

  const { fname, lname, eMail, subject, message } = state;

  if (fname == null || fname == undefined || fname.split(" ").join("") == "" ||
    lname == null || lname == undefined || lname.split(" ").join("") == "" ||
    eMail == null || eMail == undefined || eMail.split(" ").join("") == "" ||
    subject == null || subject == undefined || subject.split(" ").join("") == "" ||
    message == null || message == undefined || message.split(" ").join("") == "") {

    /* usePopUp("Verifique que todos los campos se hayan completado.", 'error'); */ 
  } else {

    sendContactMail(e, state, loadingForm);
  }
};

const sendContactMail = (e, state, loadingForm) => {

  console.log(state)

  const { fname, lname, eMail, subject, message } = state;

  loadingForm.classList.remove("hidden");
  e.target.elements.submit.classList.add("hidden")

  fetch("https://formsubmit.co/ajax/libonati.jonathan@gmail.com", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      Nombre: `${fname}`,
      Apellido: `${lname}`,
      eMail: `${eMail}`,
      Asunto: `${subject}`,
      Mensaje: `${message}`,
    })
  })
    .then(response => {
      console.log(response);
      e.target.reset()
    })
    .catch(error => {
      console.log(error);
    }).finally(() => {
      e.target.elements.submit.classList.remove("hidden")
      loadingForm.classList.add("hidden");
    });
}