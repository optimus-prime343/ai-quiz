import type { ComponentProps } from 'react'

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'

export const RecentActivityCard = (props: ComponentProps<typeof Card>) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Recent Activity</CardTitle>
        <CardDescription>You have played a total of 10 games</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[500px]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          itaque impedit, reiciendis exercitationem quasi fugit sint quod illo
          odit natus atque placeat in obcaecati id velit voluptas nesciunt! Quae
          aut enim unde voluptas, ab quisquam quos velit pariatur tenetur,
          soluta libero perspiciatis! Provident, esse minus incidunt maxime cum
          nesciunt error sit tempora, libero quisquam illum assumenda explicabo
          quae autem. Inventore eaque quia quas voluptatem fugit quam velit
          provident ipsa. Quaerat dolorum, accusamus impedit adipisci
          necessitatibus asperiores ut modi quidem iure, corporis saepe commodi
          quis quo facilis magnam. Consequuntur deleniti culpa dolores eaque
          illum voluptas harum ipsam, autem odio sequi dicta totam earum maiores
          ullam architecto iure rerum mollitia eum quod atque minima minus alias
          iste! Error, eveniet voluptate accusamus deserunt nostrum vero aliquid
          in illo exercitationem distinctio expedita labore, itaque voluptatem
          odit atque? Inventore numquam nihil officia ducimus rerum alias!
          Aspernatur, molestias suscipit. Sint sed nesciunt quas voluptate. Aut
          architecto iusto vel itaque quo. Iusto, laboriosam? Quisquam alias
          inventore doloremque culpa voluptatibus minima non, aspernatur
          obcaecati officiis, rem similique quibusdam, repudiandae illum at
          veritatis odio laudantium. Et sed, commodi vero expedita explicabo eum
          delectus fugit quos error necessitatibus esse inventore ipsa sequi ad
          accusantium suscipit praesentium rerum mollitia sunt perspiciatis
          facilis. Tenetur vel doloribus, distinctio facilis veniam atque
          perferendis maxime reiciendis doloremque necessitatibus impedit
          delectus dolorum beatae, enim animi reprehenderit in adipisci quam
          odio, inventore optio? Assumenda, labore incidunt? Sapiente facere
          consectetur praesentium earum ipsa dicta, quasi maiores doloribus
          soluta molestias sunt pariatur totam quis at reprehenderit rerum
          excepturi eos omnis magnam? Facilis esse doloribus assumenda? Incidunt
          alias ipsum suscipit corporis, voluptatem voluptates. Eius tempora est
          necessitatibus illum voluptatibus delectus dolore libero tenetur
          obcaecati ducimus, pariatur earum labore facilis nisi aliquam
          adipisci! Dolorem amet quia, assumenda aliquid asperiores accusantium
          architecto rem cumque neque repellendus unde tempora dolores omnis aut
          ullam!
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
