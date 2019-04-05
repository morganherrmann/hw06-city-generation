#include "list.h"

/**
* Initialize the head of the list.
* Initialize the head fields to be 0 OR NULL to start.
* @return The new head node.
*/
struct list_element* init_list();

/**
* Insert item at head of list.
* @param address of the head node.
* @val the value to insert.
* @return The status to indicate success (LIST_OKAY) or failure (LIST_HEAD_NULL)
*/
LIST_STATUS insert_head(struct list_element** head, int val);

/**
* Insert the item at the tail of the list, given the head.
* @param head = Head node.
* @param val = Value for the new node.
*/
LIST_STATUS insert_tail(struct list_element* head, int val);

/*
* I don't know if we really need this here.
*/
LIST_STATUS peek_tail(struct list_element* head, struct list_element** tail);


/*
* Pop off the current head of the list.
* @param head Address of the head node.
* @ return LIST_STATUS to indicate successful execution. (LIST_OKAY, LIST_EMPTY, LIST_HEAD_NULL)
*/
LIST_STATUS pop_head(struct list_element** head);

/*
* Pop off the current TAIL of the list.
* @param head The head node.
* @ return LIST_STATUS to indicate successful execution. (LIST_OKAY, LIST_EMPTY, LIST_HEAD_NULL)
*/
LIST_STATUS pop_tail(struct list_element* head);

/*
* Delete the first occurrence of a node with the matching value.
* @param head The address of head node.
* @ return LIST_STATUS to indicate successful execution. (LIST_OKAY, LIST_ELEMENT_NOT_FOUND, LIST_EMPTY, LIST_HEAD_NULL)
*/
LIST_STATUS delete(struct list_element** head, int val);

/*
* Clear ALL elements in the list INCLUDING the head.
* @param head The head node.
* @ return LIST_STATUS to indicate successful execution. (LIST_EMPTY, LIST_HEAD_NULL)
*/
LIST_STATUS clear_list(struct list_element* head);


/*
* Convert a list status to a string
* @param status - List status
* @return string representation of the list status
*/
const char* status_to_string(LIST_STATUS status);

/*
* @param head - Address of the head node
* @param val - the value to check for
* @return true if the input value exists in the list
*/
bool contains(struct list_element** head, int val);


/*
* Print all the strings to the screen and have the line start
* with "List: " and ends with a newline
* Example:
* List: 2 3 6
*/
void print_list(struct list_element* head);
