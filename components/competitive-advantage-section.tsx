'use client'

import { Container } from "./layout/container"
import { Section } from "./layout/section"
import { SectionHeader } from "./sections/section-header"

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CompetitiveAdvantageSection() {


    return (
        <Section size="md">
            <Container size="md">

                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-adxc bg-pink-50 px-3 py-1 rounded-full mb-3">Competitive Advantage</span>
                    <SectionHeader
                        title="There are no pay-as-you-go providers in the market because the technology that enables this approach is only 6 months old and we are patenting the tech that makes it useful"
                        size="sm"
                        align="center"
                    />
                </div>

                <Card className="max-w-3xl mx-auto border-border bg-card shadow-sm overflow-hidden">
                    <CardContent className="py-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-border">
                                    <TableHead className="text-foreground font-semibold w-1/2">Competitors</TableHead>
                                    <TableHead className="text-foreground font-semibold w-1/2">How Our Solution Is Better</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="border-border">
                                    <TableCell className="text-muted-foreground">Large data providers</TableCell>
                                    <TableCell className="text-foreground">We only charge for the data that is actually used</TableCell>
                                </TableRow>
                                <TableRow className="border-border">
                                    <TableCell className="text-muted-foreground">Small data providers</TableCell>
                                    <TableCell className="text-foreground">We consolidate data to answer questions</TableCell>
                                </TableRow>
                                <TableRow className="border-border">
                                    <TableCell className="text-muted-foreground">Standard LLMs</TableCell>
                                    <TableCell className="text-foreground">We connect LLMs to paywalled data</TableCell>
                                </TableRow>
                                <TableRow className="border-border">
                                    <TableCell className="text-muted-foreground">Internal data sets</TableCell>
                                    <TableCell className="text-foreground">We complement them with paid data</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </Container>
        </Section>
    )
}
