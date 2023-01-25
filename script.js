const contentSections = document.querySelectorAll('.content');
const aboutBtn = document.querySelector('.about')
const skillsBtn= document.querySelector('.skills')
const projectsBtn = document.querySelector('.projects')
const contactBtn = document.querySelector('.contact')
const circles = document.querySelectorAll('.circle')
const lines = document.querySelectorAll('.line')
const mobileMenuSwitch = document.querySelector('#menu-switch')

// scroll sections into view
const scrollToElement = (element)=>{
    // close mobile menu
    mobileMenuSwitch.checked  = false;
    //scroll element into view
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
}

//events to scroll into different sections
aboutBtn.addEventListener('click',()=>{
    scrollToElement(document.querySelector('.about-section'))
})
skillsBtn.addEventListener('click',()=>{
    scrollToElement(document.querySelector('.skills-section'))
})
projectsBtn.addEventListener('click',()=>{
    scrollToElement(document.querySelector('.projects-section'))
})
contactBtn.addEventListener('click',()=>{
    scrollToElement(document.querySelector('.contact-section'))
})

// display scroll progress using circle link
const displayScrollProgress = (index)=>{
    circles.forEach((circle,idx)=>{
        if(idx <= index){
            setTimeout(()=>{
                    if(idx-1 >= 0 ) lines[idx-1].style.height = '100%';
                    circle.style.background = "var(--clr-secondary)";
            },100);
        }else{
            setTimeout(()=>{
                circle.style.background = "transparent";
                if(idx-1 >= 0) lines[idx-1].style.height = '0%';
            },100)
        }
    })
}

// intersection observer 
const options = {
    threshold:0.5
}
const observer = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            // console.log(entry.target.getAttribute('data-index'))
            displayScrollProgress(entry.target.getAttribute('data-index'))
        }
        return
    })
},options)
// intersection observer for projects
const projectObserver = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting)
            entry.target.firstElementChild.classList.add('grow')            
        else
            entry.target.firstElementChild.classList.remove('grow');
        
        return
    })
},{threshold:0.85 })

//observe content sections
contentSections.forEach(section=>observer.observe(section))

//projects
const projects = [...document.querySelectorAll('.project')];
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let positionCount = 0;

// const maxRight = 
let base = 0;
const alignProjects = (shiftQuantity = 27)=>{
    projects.forEach((project)=>{
        project.style.transform = `translateX(${base}rem)`
        project.dataset.position = base;
        base+=shiftQuantity;
        
    })
}
const shiftProjects = (increment=true,shiftQuantity = 27)=>{
    projects.forEach((project)=>{
        let position = parseInt(project.dataset.position)
        if(increment ) 
            position+=shiftQuantity;
        else
            position-= shiftQuantity;
        
        project.dataset.position = position;
        project.style.transform = `translateX(${position}rem)`
        console.log(positionCount)
    })
}
// event listener to shift projects left
prevBtn.addEventListener('click',()=>{
    if(positionCount == 0) return 
    positionCount++
    shiftProjects(true,27);
})
// event listener to shift projects right
nextBtn.addEventListener('click',()=>{
    if(positionCount < -1*projects.length+2) return 
    positionCount--
    shiftProjects (false,27);
})

// spread out projects
alignProjects()

// project intersection observe
projects.forEach(project=>{
    projectObserver.observe(project);
})