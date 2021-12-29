I'd like to pick up four famous bugs that are hard to detect.

## 1. Let's Encrypt, loop with reference

- [bugzilla.mozilla.org/show_bug.cgi?id=1619047](https://bugzilla.mozilla.org/show_bug.cgi?id=1619047)

Something that the compiler should detect. But the compiler can't tell if it's an `illegal practice` or just a `clever hack` to update values in place.

`&kCopy`s converge into one adress.
```go
() {
	resp := &sapb.Authorizations{}
	for k, v := range m {
		// Make a copy of k because it will be reassigned with each loop.
		kCopy := k
		authzPB, err := modelToAuthzPB(&v)
		if err != nil {
			return nil, err
		}
		resp.Authz = append(resp.Authz, &sapb.Authorizations_MapElement{Domain: &kCopy, Authz: authzPB})
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

A downside of microservice architecture is that it's beyond the checking mechanism of compilers, like Regular Expression itself is a powerful language so that it comes with both `flexibility and unpredictability`. Integration testing and debugging often become harder.

## 4. Hewlett-Packard, data loss incident - backup Ops with shell script

- [bot.rnewshub.com/77tb-of-kyoto-university-supercomputer-information-lacking-because-of-bug-in-hp-japan-pc-watch-software-program/](https://bot.rnewshub.com/77tb-of-kyoto-university-supercomputer-information-lacking-because-of-bug-in-hp-japan-pc-watch-software-program/)

The back-up operation was written in a shell script which contained the `find` command and some bash functions. It was during the operation. The new version of this shell script was overwitten, which caused the hot reloading by the `sh` process. The Unix shell interpreter returned an empty string '' as one of bash functions became undefined or one of variables get cleared, and the succeeding procedure executed the delete command on the root of directory subtree.

A direct protective measure was the writing of the code in a compiler language such as C, Rust, and Go but not in Bash. An example is [rustup](https://github.com/rust-lang/rustup). This installer itself is written in Rust. Writing an extensive application in something like Bash or `AWK` can be abusive. But it's not the nitty-gritty.

Systematic approach is more conservative, and it's recommended to backup addition-wise with generation info like git keeps the full development history. But it's expensive.

Another problem is the locking or things like the garbage collector's `Stop The World`. Keep observing and applying changes on an ever-changing system is not easy stuff. If possible, it's preferred to make the transition from system-wide approaches to the ones having the nature of divide-and-conquer with `lock` as keeping atomicity and consistency.
