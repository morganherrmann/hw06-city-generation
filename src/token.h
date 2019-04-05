#ifndef TOKEN_H
#define TOKEN_H

#include <stdio.h>

#define MAX_TOKEN_LENGTH 250


/*
* ENUM - token types.
* Add all token types for others mentioned in writeup.
*/
typedef enum {
EMPTY

} token_type;


/*
* Token with the fields mentioned in the writeup.
*/
typedef struct {



} token;

//@return a blank token
token* init_token();

//@param - token* t - token to delete
void delete_token(token* t);

#endif
