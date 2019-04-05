#ifndef TOKENIZER_H
#define TOKENIZER_H

#include "token.h"

int read_token(FILE *inputFile, FILE* output_file, char name[]);

//debugging function
void print_token(token *t);

//process the current token
void process(token *curr, FILE *output_file);
