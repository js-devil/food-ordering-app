class Faq {
    constructor() {
        this.faqText = document.querySelectorAll('.faq__content');
        this.faqHeader = document.querySelectorAll('.faq__header');
        this.faqItem = document.querySelectorAll('.faq__item');
        this.animHeight();
        this.triggerEvent();
    }

    triggerEvent() {
        window.addEventListener('resize', () => {
            this.animHeight();
        })
    }

    animHeight() {
        this.faqHeader.forEach((element, i) => {
            this.faqItem[i].style.height = `${element.clientHeight}px`;

            element.addEventListener('click', (e) => {
                this.changeHeight(e, i)
            });
            // console.log(element.clientHeight, 'is')
        });
    }

    changeHeight(e, i) {
        this.faqItem.forEach((element, x) => {
            if (i !== x) {
                this.faqItem[x].style.height = `${this.faqHeader[x].clientHeight}px`;
                this.faqHeader[x].classList.remove("active");
            } else if ((i === x) && (element.clientHeight > (this.faqHeader[x].clientHeight + 2))) {
                element.style.height = `${this.faqHeader[x].clientHeight}px`;
                this.faqHeader[i].classList.remove("active");
            } else {
                this.faqHeader[i].classList.add('active');
                this.faqItem[i].style.height = `${this.faqHeader[x].clientHeight + 17 + this.faqText[x].clientHeight}px`
            }

        })
    }
}


export default Faq;