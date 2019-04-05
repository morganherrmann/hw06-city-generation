#include "tokenizer.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>


int read_token(FILE* inputFile, FILE* output_file, char name[]);


void print_token(token *token);
