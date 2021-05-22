26 April 2021

I haven't ever had a **computer science** class. I'd say I'm behind those people graduated in the field for 48 months. I had to spend some time to understand what is the book shelf like to be for a CS student.

Although it's said that nothing is given so freely as advice, with a wish that what I listed up here is useful not only for me but also for people, here I'm writing this article that is meant to provide a comprehensive map.

I'd stick to ***OPEN DATA STRUCTURES*** and ***PROJECT EULER*** mentioned at the bottom of this page, and use the rest of them as supplementary resources.

# Useful materials

🎞️🎞️🎞️ <a href="https://www.youtube.com/playlist?list=PLvKZ11Lvt-qnJYP8Ntr-k7rBd6xVq3UhH" target="_blank">Youtube playlist containing all videos listed in this page.</a>

<html>
<style>
.thumbnail img {
    width:120px;
    transition: width 0.2s;
    margin: 0.5em;
}
.thumbnail {
    width: 100%;
    text-align: center;
}
.thumbnail img:hover {
    width:600px;
}
</style>
</html>

## Computer architecture

🎞️ MIT, 9.2.3 The von Neumann Model\
Confirm that CPUs have the dedicated **ADDRESS BUS** in addition to the data bus.
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=H0xGKKpKaRE" target="_blank"><img src="./imgs/address-bus.png"></a>
</div>

🎞️ Inside the CPU - Computerphile\
Address bus (2)
<div class="thumbnail">
<a href="https://youtu.be/IAkj32VPcUE?t=246" target="_blank"><img src="./imgs/address-bus-2.png"></a>
</div>

🎞️ Introduction to Von Neuman Architecture (Fetch-Decode-Execute) Cycle\
Confirm that instructions **LDD**, **ADD**, **STO**, and data **27**, **35** are stored in memory.\
Addressing is the only way to tell the difference of them.
<div class="thumbnail">
<a href="https://youtu.be/u9WK73mCD6U" target="_blank"><img src="./imgs/addressing.png"></a>
</div>

🎞️ Tom Scott, The Fetch-Execute Cycle: What's Your Computer Actually Doing?\
Confirm that there's **JUMP** instruction, which will be described for the genesis of the subroutine later.
<div class="thumbnail">
<a href="https://youtu.be/Z5JC9Ve1sfI" target="_blank"><img src="./imgs/jump.png"></a>
</div>

🎞️ The Calculator Wars: A video history of Japan's electronic industry (Part 3)\
Confirm that the bit part of the **64bit** and **32bit** CPU describes the addressible memory breadth. What is called `usize` type, unsigned integer, 64bit length in the case of a x86_64 CPU.\
**<a href="https://en.wikipedia.org/wiki/Intel_4004" target="_blank">Intel 4004</a>** a 4bit processor. The capacity of an address will be mentioned in Open Data Structures as the *word length*.
<div class="thumbnail">
<a href="https://youtu.be/ansXGewduN4?t=1613" target="_blank"><img src="./imgs/64bit.png"></a>
</div>

🎞️ そろばんで３度目の日本一　西宮市の中３女子\
The arithmetics with a set of circuits in CPU must be the same mechanism to a series of skills that the hands perform on a bit-wise abacus in fundamentals.
<div class="thumbnail">
<a href="https://youtu.be/7LZemQttCXE?t=13" target="_blank"><img src="./imgs/abac.png"></a>
</div>

🎞️ Pointers and dynamic memory - stack vs heap\
Confirm that there are regions called **STACK FRAMES** for each function call.
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=_8-ht2AKyH4" target="_blank"><img src="./imgs/stack-frames.png"></a>
</div>

🎞️ freeCodeCamp.org, Pointers in C / C++ [Full Course]\
Confirm that jumping is enabled by means of the technique called function pointers, which allows us to use **LOOP** for example.\
You might prefer to watch CS50 written below first.
<div class="thumbnail">
<a href="https://youtu.be/zuegQmMdy8M?t=11198" target="_blank"><img src="./imgs/function-pointer.png"></a>
</div>

🎞️ Wheeler Jump - Computerphile\
Story behind the **sub-routine**
<div class="thumbnail">
<a href="https://youtu.be/zR8V0lq029c" target="_blank"><img src="./imgs/subroutine.png"></a>
</div>

## Software development

🎞️ CS50 2020 - Lecture 4 - Memory\
Confirm the **garbage values** in memory and the **undefined behaviour** in C.
<div class="thumbnail">
<a href="https://youtu.be/NKTfNv2T0FE" target="_blank"><img src="./imgs/garbage-value.png"></a>
</div>

🎞️ CS50 2020 - Lecture 3 - Algorithms\
**Finding** and comparison
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=gR6nycuZKlM" target="_blank"><img src="./imgs/comparison.png"></a>
</div>

🎞️ CS50 2020 - Lecture 5 - Data Structures\
Confirm the physical restriction on the consective allocation extension, for the area is possibly already **claimed** by the other.
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=2T-A_GFuoTo" target="_blank"><img src="./imgs/ordering.png"></a>
</div>

🎞️ Junmin Lee, Golang Tutorial 3 - Golang pointers explained, once and for all\
Memory and the **pointer** in summary
<div class="thumbnail">
<a href="https://youtu.be/sTFJtxJXkaY" target="_blank"><img src="./imgs/pointer.png"></a>
</div>

## Data structures and algorithms

For your information, the notation **O**, that describes the growth of requirement, is relative and depends on the focus, that is, there's the implicit agreement on what's the base unit when having a discussion about it.

As described in Open Data Structures, the CPU instructions are specific on the devices and compilers, namely, the **Rust** compiler inserts the boundary check to avoid from accessing the garbage values unlike C; and like some CPUs have special circuits designed for the Java byte code execution, it says **ARM** CPUs have optimizations for short condition branching.

It's not about the number of calls. For instance, memory allocation is a heavier operation than the instructions which the **"lenth()"** call produces. For that reason, the concatenation of Strings is faster to scan through all elements to calculate the necessary capacity first than omitting this preparation.\
When focusing on a heavier operation, like CS50 does, uneffective parts magnitude wise are not considered.

🎞️ Fyi, MIT, Instruction-level Parallelism
<div class="thumbnail">
<a href="https://youtu.be/IK9OVbj_Ir0" target="_blank"><img src="./imgs/performance.png"></a>
</div>

Fyi, ARM architecture - conditional execution - Wikipedia
<div class="thumbnail">
<a href="https://en.wikipedia.org/wiki/ARM_architecture#Conditional_execution" target="_blank"><img src="./imgs/shortif.png"></a>
</div>

---

🎞️ freeCodeCamp, Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer\
Comprehensive step by step tutorial about data structures. This allowed me to be familier to their names and ready to read books about them.

 * <a href="https://github.com/williamfiset/data-structures" target="_blank">https://github.com/williamfiset/data-structures</a>
 * <a href="https://github.com/williamfiset/Algorithms" target="_blank">https://github.com/williamfiset/Algorithms</a>

<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=RBSGKlAvoiM" target="_blank"><img src="./imgs/binary-tree.png"></a>
</div>

🎞️ Spanning Tree, What is Binary Heap\
There are sort of confusion in nomenclature, and watching these videos by Brian from CS50 at that timing helped me to understand the 8h data structure tutorial.
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=AE5I0xACpZs" target="_blank"><img src="./imgs/pq.png"></a>
</div>

🎞️ Spanning Tree, What Are Bloom Filters?
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=kfFacplFY4Y" target="_blank"><img src="./imgs/broo.png"></a>
</div>

🎞️ Spanning Tree, How Dijkstra's Algorithm Works
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=EFg3u_E6eHU" target="_blank"><img src="./imgs/di.png"></a>
</div>

🎞️ Spanning Tree, How Do You Calculate a Minimum Spanning Tree?
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=Yldkh0aOEcg" target="_blank"><img src="./imgs/spa.png"></a>
</div>

🎞️ Junmin Lee, Graph data structure and graph representation (Part 1 of 2)\
It was helpful to watch this video at that point not to sink in the confusion.
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=JDP1OVgoa0Q" target="_blank"><img src="./imgs/gra.png"></a>
</div>

🎞️ Junmin Lee, Data Structures and Algorithms in Go - Heaps
<div class="thumbnail">
<a href="https://www.youtube.com/watch?v=3DYIgTC4T1o&list=PL0q7mDmXPZm7s7weikYLpNZBKk5dCoWm6" target="_blank"><img src="./imgs/heap.png"></a>
</div>

---

📖 Open Data Structures\
It took me a while to know there was this book.

 * <a href="https://github.com/patmorin/ods/tree/master/java" target="_blank">https://github.com/patmorin/ods/tree/master/java</a>
 * <a href="https://github.com/spinute/ods-go" target="_blank">https://github.com/spinute/ods-go</a>
 * <a href="https://github.com/o8vm/ods" target="_blank">https://github.com/o8vm/ods rust</a>

<div class="thumbnail">
<a href="http://opendatastructures.org/" target="_blank"><img src="./imgs/ods.png"></a>
</div>

📖 Algorithms in a Nutshell: A Practical Guide 2nd Edition\
I flipped through all pages. I'd stick to Open Data Structures.\
As the area overlaps with the 8h video, of course, it was great to see words I read before, like Open Adressing and Broom Filter.
<div class="thumbnail">
<a href="https://www.amazon.com/Algorithms-Nutshell-Practical-George-Heineman/dp/1491948922" target="_blank"><img src="./imgs/aln.png"></a>
</div>

📖 Princeton University, Algorithms (4th Edition)\
I haven't read it but it seems Algorithms in a Nutshell and this book are famous ones for programmers (not for mathematicians).

 * <a href="https://algs4.cs.princeton.edu/24pq/" target="_blank">2.4 Priority Queues</a>

<div class="thumbnail">
<a href="https://www.amazon.com/Algorithms-4th-Robert-Sedgewick/dp/032157351X" target="_blank"><img src="./imgs/algop.png"></a>
</div>

Additionally, it was comprehensive too. But I'd better stick to Open Data Structures.

 * <a href="https://www.cs.bham.ac.uk/~jxb/DSA/dsa.pdf" target="_blank">Lecture Notes for Data Structures and Algorithms (School of Computer ScienceUniversity of Birmingham)</a>

---

📖 WILLEY, Data Structures and Algorithms in Java, 6th Edition\
In fact I read only 4/15 chapters. But it's worth having at office.\
It was nice to know about the generics dynamic dispatch and the parameteres in Java are passed by value example, such as `badReset(Counter c) {c = new Counter();} //reassign local name c to a new Counter`.
<div class="thumbnail">
<a href="https://www.amazon.com/Data-Structures-Algorithms-Java-6th-ebook/dp/B00JDRQF8C" target="_blank"><img src="./imgs/j6.png"></a>
</div>

📖 SAMS, Data Structures and Algorithms in Java 2nd Edition\
I haven't read it and probably it's not required if you have Open Data Structures.
<div class="thumbnail">
<a href="https://www.amazon.com/Data-Structures-Algorithms-Java-2nd/dp/0672324539" target="_blank"><img src="./imgs/j2.png"></a>
</div>

---

🖊️ Project Euler\
I solved 33 questions so far and it helped me to remember mathematics and to know algorithms.

 * <a href="https://euler.stephan-brumme.com/" target="_blank">https://euler.stephan-brumme.com/</a>
 * <a href="https://www.nayuki.io/page/project-euler-solutions" target="_blank">https://www.nayuki.io/page/project-euler-solutions</a>

<div class="thumbnail">
<a href="https://projecteuler.net/" target="_blank"><img src="./imgs/eu.png"></a>
</div>

As for referring to math handbooks, it looks to me they are the only ones I need to look up.

📖 The Concise Oxford Dictionary of Mathematics
<div class="thumbnail">
<a href="https://www.amazon.com/Concise-Oxford-Dictionary-Mathematics-Reference/dp/0199679592/" target="_blank"><img src="./imgs/om.png"></a>
</div>

📖 Schaum's Outline of Mathematical Handbook of Formulas and Tables, Fifth Edition
<div class="thumbnail">
<a href="https://www.amazon.com/Schaums-Mathematical-Handbook-Formulas-Outlines/dp/1260010538" target="_blank"><img src="./imgs/form.png"></a>
</div>

Alternatively,  <a href="https://cambomaths.files.wordpress.com/2010/03/1300_math_formulas.pdf" target="_blank">1300 Math Formulas PDF</a>

## Compiler design

I haven't read them but it seems there are some chapters about data structures.

📖 Advanced Compiler Design and Implementation
<div class="thumbnail">
<a href="https://www.amazon.com/Advanced-Compiler-Design-Implementation-Muchnick/dp/1558603204/" target="_blank"><img src="./imgs/cpd.png"></a>
</div>

📖 Compilers: Principles, Techniques, and Tools 2nd Edition
<div class="thumbnail">
<a href="https://www.amazon.com/Compilers-Principles-Techniques-Tools-2nd/dp/0321486811" target="_blank"><img src="./imgs/cmp.png"></a>
</div>

# PS

Data structures and algorithms might be easier than the non-pedagogical programming in a sense for its internal perfection and predictability.

I mean, I can imagine you are using **Postman** to check against a service that was provided by some organisation so that you can confirm the functionalities are implemented as described in their documents after experiencing irregular behaviours; you are collating the version of a **Kubernetes'** application in debugging for a runtime error that couldn't be detected with mock tests; or you are in a tunnel to find out idioms unheard of to write a passable **Gradle** script or an industrial level quality test code with the most up-to-date **Mockito** library with an extention that is also unheard of. A warning says I must not click **the back button in the browser**; or a question form doesn't have the option to choose for my answer. To speak ultimately, these sort of problems occur regardless of using a computer or a sheet of paper.

As for me, having been stuck in quotidian affairs, I'm poor in certain things to be certified. As you see from this page, I'm so a non-starter literally, which is not what I'm proud of.
