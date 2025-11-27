import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function PruebaPagination({ currentPage, totalPages, basePath = "/" }) {
    return (
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : '#'}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}/>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        href={currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : '#'}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}/>
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}
