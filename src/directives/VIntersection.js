export default {
    mounted(el, {value}) {
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer)=>{
            if (entries[0].isIntersecting ){
                value()
            }
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe(el)
    },
    name: 'intersection'
}