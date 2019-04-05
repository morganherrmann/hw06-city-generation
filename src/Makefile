all: jc

list.o: list.c list.h
	clang -c list.c

tokenizer.o: tokenizer.c tokenizer.h
	clang -c tokenizer.c

token.o: token.c token.h
	clang -c token.c

jc: jc.c list.o tokenizer.o token.o
	clang list.c token.c tokenizer.c jc.c -o jc

clean:
	rm -rf *.o

clobber: clean
	rm -rf jc
