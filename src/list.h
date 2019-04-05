#ifndef LIST_H
#define LIST_H

#include <stdlib.h>
#include <stdio.h>


typedef struct list_element{

  int val;
  struct list_element* next;

} list_element;


typedef enum {

  LIST_OKAY,
  LIST_EMPTY,
  LIST_HEAD_NULL,
  LIST_ELEMENT_NOT_FOUND

} LIST_STATUS;


struct list_element* init_list();
LIST_STATUS insert_head(struct list_element** head, int val);
LIST_STATUS insert_tail(struct list_element* tail, int val);
LIST_STATUS peek_tail(struct list_element* head, struct list_element** tail);
LIST_STATUS pop_head(struct list_element** head);
LIST_STATUS pop_tail(struct list_element* head);
LIST_STATUS delete(struct list_element** head, int val);
LIST_STATUS clear_list(struct list_element* head);

const char* status_to_string(LIST_STATUS status);
bool contains(struct list_element** head, int val);
void print_list(struct list_element* head);
