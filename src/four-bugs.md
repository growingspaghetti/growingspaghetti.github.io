I'd like to pick up four famous bugs that are hard to detect.

## 1. Let's Encrypt, loop with reference

- [bugzilla.mozilla.org/show_bug.cgi?id=1619047](https://bugzilla.mozilla.org/show_bug.cgi?id=1619047)

Something that the compiler should detect. But the compiler can't tell if it's an `illegal practice` or just a `clever hack` to update values in place.

`&v`s converge into one single address.
```go
func authzModelMapToPB(m map[string]authzModel) (*apb.Authorizations, error) {
        resp := &apb.Authorizations{}
        for k, v := range m {
                // Make a copy of k because it will be reassigned with each loop.
                kCopy := k
                authzPB, err := modelToAuthzPB(&v)
                if err != nil {
                        return nil, err
                }
                resp.Authz = append(resp.Authz, &apb.Authorizations_MapElement{Domain: &kCopy, Authz: authzPB})
        }
        return resp, nil
}
```

- [github.com/golang/go/wiki/CommonMistakes#using-reference-to-loop-iterator-variable](https://github.com/golang/go/wiki/CommonMistakes#using-reference-to-loop-iterator-variable)

```go
package main

import "fmt"

func main() {
	var out []*int
	for i := 0; i < 3; i++ {
		out = append(out, &i)
	}
	fmt.Println("Values:", *out[0], *out[1], *out[2])
	fmt.Println("Addresses:", out[0], out[1], out[2])
	// Values: 3 3 3
	// Addresses: 0xc000126000 0xc000126000 0xc000126000
}
```

```go
package main

import (
	"fmt"
)

func main() {
	set := map[int]bool{}
	set[175] = true
	set[119] = false
	set[450] = true

	fmt.Println(set)
	for k, v := range set {
		fmt.Println(&k, k, &v, v)
	}
	// map[119:false 175:true 450:true]
	// 0xc000018068 175 0xc000018080 true
	// 0xc000018068 119 0xc000018080 false
	// 0xc000018068 450 0xc000018080 true
}
```

In Rust, `for` loop is a "consumer" by default. That is very confusing at a first look.
```rust,editable
use std::collections::HashMap;

fn consuming_iter() {
    let m = HashMap::from([(123, true), (456, false), (789, true)]);
    println!("{:p}", &m);
    for (k, v) in m.into_iter() {
        println!("{}\t{:p}\t{}\t{:p}", k, &k, v, &v);
    }
    // println!("{:?}", m) value borrowed here after move error
}

fn consuming_iter_to_be_called() {
    let m = HashMap::from([(123, true), (456, false), (789, true)]);
    println!("{:p}", &m);
    // "for _ in m" is a syntax sugar for m.into_iter()
    for (k, v) in m {
        println!("{}\t{:p}\t{}\t{:p}", k, &k, v, &v);
    }
    // println!("{:?}", m) value borrowed here after move error
}

fn non_consuming_iter() {
    let m = HashMap::from([(123, true), (456, false), (789, true)]);
    println!("{:p}", &m);
    for (k, v) in m.iter() {
        println!("{}\t{:p}\t{}\t{:p}", k, k, v, v);
        // println!("{}\t{:p}\t{}\t{:p}", *k, k, *v, v); // same. explicit dereferencing
    }
    println!("{:?}", m)
}

fn non_consuming_iter_to_be_called() {
    let m = HashMap::from([(123, true), (456, false), (789, true)]);
    println!("{:p}", &m);
    // "for _ in &m" is a syntax sugar for .iter()
    for (k, v) in &m {
        println!("{}\t{:p}\t{}\t{:p}", k, k, v, v);
        // println!("{}\t{:p}\t{}\t{:p}", *k, k, *v, v); // same. explicit dereferencing
    }
    println!("{:?}", m)
}

fn main() {
    // same address of a value in loop
    consuming_iter();
    consuming_iter_to_be_called();
    println!("---");
    // the original addresses of the values in map
    non_consuming_iter();
    non_consuming_iter_to_be_called();
}

// 0x7ffc7da2ff30 <- frame of map struct in stack pointing to actual values in heap
// 789	0x7ffc7da2feac	true	0x7ffc7da2fe1f <- value copied to stack
// 123	0x7ffc7da2feac	true	0x7ffc7da2fe1f <- value copied to stack
// 456	0x7ffc7da2feac	false	0x7ffc7da2fe1f <- value copied to stack
// 0x7ffc7da2ff30 <- frame of map struct in stack pointing to actual values in heap
// 123	0x7ffc7da2feac	true	0x7ffc7da2fe1f <- value copied to stack
// 456	0x7ffc7da2feac	false	0x7ffc7da2fe1f <- value copied to stack
// 789	0x7ffc7da2feac	true	0x7ffc7da2fe1f <- value copied to stack
// ---
// 0x7ffc7da2feb0 <- frame of map struct in stack pointing to actual values in heap
// 456	0x562b9bf4ac98	false	0x562b9bf4ac9c <- value in heap
// 123	0x562b9bf4ac88	true	0x562b9bf4ac8c <- value in heap
// 789	0x562b9bf4ac80	true	0x562b9bf4ac84 <- value in heap
// {456: false, 123: true, 789: true}
// 0x7ffc7da2feb0 <- frame of map struct in stack pointing to actual values in heap
// 456	0x562b9bf4ac98	false	0x562b9bf4ac9c <- value in heap
// 123	0x562b9bf4ac90	true	0x562b9bf4ac94 <- value in heap
// 789	0x562b9bf4ac88	true	0x562b9bf4ac8c <- value in heap
// {456: false, 123: true, 789: true}
```

---

- [wantedly.com/companies/wantedly/post_articles/290761 (Japanese)](https://www.wantedly.com/companies/wantedly/post_articles/290761)

In a sense, it's working like the union type of C that enables the sharing of the same memory address between different things.


![union.png](./imgs/union.png)

![https://upload.wikimedia.org/wikipedia/commons/f/f8/Union_jp.png](https://upload.wikimedia.org/wikipedia/commons/f/f8/Union_jp.png)

```go
package main

import "fmt"

func main() {
	slice := []int{2, 2, 5, 3, 6, 9, 2}
	fmt.Println("original =", slice)
	// original = [2 2 5 3 6 9 2]
	filtered := slice[:0]
	for _, elem := range slice {
		if elem%2 == 0 {
			filtered = append(filtered, elem)
		}
	}
	fmt.Println("filtered =", filtered)
	fmt.Println("original =", slice)
	// filtered = [2 2 6 2]
	// original = [2 2 6 2 6 9 2]
}
```

In some other languages, `immutability` resolves this difficulty.

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<String>();
    list.add("A");
    list.add("B");
    list.add("C");
    for (String str : list) {
        if ("B".equals(str)) {
            // ConcurrentModificationException
            list.remove(str);
        }
    }
}
```

## 2. Chrome OS, typo in log-in condition && and & 

- [news.ycombinator.com/item?id=27922545](https://news.ycombinator.com/item?id=27922545)

```cpp
if (key_data_.has_value() && !key_data_->label().empty()) {}
if (key_data_.has_value() & !key_data_->label().empty()) {}
```

In modern languages, except for javascript, `0 1` and `false true` are segregated. It's more dangerous than convenient.

## 3. log4j, composition of functionalities

<html><center><iframe width="560" height="315" src="https://www.youtube.com/embed/Opqgwn8TdlM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center></html>

Due to the `combinatorial explosion` and the devil's proof, you can't say there surely won't be a new combination of functionalities in the uncertain future that introduces a critical bug to the ecosystem.

In software engineering, "the `single-responsibility principle`" is heuristically known to tackle this difficulty. It's what's called Unix philosophy: 'Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new "features".'

A downside of microservice architecture is that it's beyond the checking mechanism of compilers, like Regular Expression itself is a powerful language so that it comes with both `flexibility and unpredictability`. Integration testing and debugging often become harder. Please read this with a grain of salt because perhaps I'm wrong, but I recalled the Linux victory over GNU Hurd of microkernel and the [controversies](https://www.howtogeek.com/675569/why-linuxs-systemd-is-still-divisive-after-all-these-years/) over the conglomerate systemd architecture.

## 4. Hewlett-Packard, data loss incident - backup Ops with shell script

- [bot.rnewshub.com/77tb-of-kyoto-university-supercomputer-information-lacking-because-of-bug-in-hp-japan-pc-watch-software-program/](https://bot.rnewshub.com/77tb-of-kyoto-university-supercomputer-information-lacking-because-of-bug-in-hp-japan-pc-watch-software-program/)

The back-up operation was written in a shell script which contained the `find` command and some bash functions. It was during the operation. The shell script was overwitten with a newer version of the code, which caused the hot reloading by the `sh` process. The Unix shell interpreter returned an empty string '' as one of bash functions became undefined or one of variables get cleared, and the succeeding procedure executed the delete command on the root of directory subtree.

A direct protective measure was the writing of the code in a compiler language such as C, Rust, and Go but not in Bash. An example is [rustup](https://github.com/rust-lang/rustup). This installer itself is written in Rust. Writing an extensive application in something like Bash or `AWK` can be abusive. But it's not the nitty-gritty.

Systematic approach is more conservative, and it's recommended to backup addition-wise with generation info like the way git keeps the full development history. But it's expensive.

Another problem is the locking or things like the garbage collector's `Stop The World`. Keep observing and applying changes on an ever-changing system is not easy stuff. If possible, it's preferred to make the transition from system-wide approaches to the ones having the nature of divide-and-conquer with `lock` as keeping atomicity and consistency.

(to talk about this incident specifically and the cheapest way of prevention, they should have started the Bash process as a special user purposely created who didn't have the permission to modify files anywhere but in `logs`. thus this data loss could be averted by the permission denial of the OS as a fail-safe measure.)

## P.S. for 1. Let's Encrypt, loop with reference

It's very often a bad practice not to use the pass-by-value feature in Go which is the default mode of the language.
```go
package main

import (
	"fmt"
)

func coalesce(v *bool, zero *interface{}) interface{} {
	if v != nil {
		return *v
	}
	return *zero
}

func main() {
	set := map[int]*bool{}
	a, b, c, d := 175, 119, 450, 999
	yes, no := true, false
	set[a] = &yes
	set[b] = &no
	set[c] = &yes
	set[d] = nil

	fmt.Println(set)
	for k, v := range set {
		fmt.Println(&k, k, v, coalesce(v, new(interface{})))
	}
	// map[119:0xc000126001 175:0xc000126000 450:0xc000126000 999:<nil>]
	// 0xc000126030 119 0xc000126001 false
	// 0xc000126030 450 0xc000126000 true
	// 0xc000126030 999 <nil> <nil>
	// 0xc000126030 175 0xc000126000 true
}
```
---

Off topic but initialization in Go can be confusing at a glance.

- [Difference between var, new and :=](https://groups.google.com/g/golang-nuts/c/4fFAZOMEDbc)

```go
package main

import (
	"fmt"
	"unsafe"
)

func Example() {
	fmt.Println("make([]int, 0) -> not nil")
	if slice := make([]int, 0); slice != nil {
		fmt.Println(unsafe.Sizeof(slice))
		slice = append(slice, 1)
	}
	fmt.Println("new([]int) -> pointer to nil")
	if slice := new([]int); *slice == nil {
		fmt.Println(unsafe.Sizeof(*slice))
		*slice = append(*slice, 1)
	}
	fmt.Println("var slice []int -> nil")
	var slice []int
	if slice == nil {
		fmt.Println(unsafe.Sizeof(slice))
		slice = append(slice, 1)
	}
	// Output:
	// make([]int, 0) -> not nil
	// 24
	// new([]int) -> pointer to nil
	// 24
	// var slice []int -> nil
	// 24
}
```
