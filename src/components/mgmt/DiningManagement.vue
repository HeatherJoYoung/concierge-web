<template>
    <div class="dining-management">
        <CustomHeader subtitle="Dining" />
        <NavBar />
        <h2>Dining Management</h2>
        <div class="main-container">
            <div class="content">
                <div class="col left">
                    <ReservationTable 
                        id="spa-res"
                        :columns="resCols"
                        :rowData="reservations"
                        title="Reservations"
                        @updateItem="updateReservation"
                        @deleteItem="deleteReservation"
                    />
                </div>
                <div>
                    <div class="services">
                        <div class="title">
                            <h3>Key Stats</h3>
                        </div>
                        <h4>Today's Dinner</h4>
                        <div v-for="(item, index) in items" :key="index" class="event-item">
                            <h5 class="event-title">{{ item.title }}</h5>
                            <p class="event-list"><span>{{ item.number }}</span></p>
                        </div>
                    </div>
                    <div class="col right">
                        <Button class="btn">Update Menu</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue'
import BasicTable from '@/components/shared/BasicTable.vue'
import ReservationTable from '@/components/shared/ReservationTable.vue'
import NavBar from '@/components/shared/NavBar.vue';

export default {
    components: {
        CustomHeader,
        // eslint-disable-next-line vue/no-unused-components
        BasicTable,
        ReservationTable,
        NavBar
    },
    data() {
        return {
            reservations: [
                {
                    date: '1/2/24',
                    time: '10:00am',
                    client: 'Jane Doe',
                    party: '4'
                },
                {
                    date: '1/2/24',
                    time: '11:00am',
                    client: 'John Smith',
                    party: '8'
                },
                {
                    date: '3/4/24',
                    time: '2:30am',
                    client: 'Mary Jackson',
                    party: '5'
                },
                {
                    date: '5/4/24',
                    time: '5:30pm',
                    client: 'Korad Laimer',
                    party: '5'
                },
                {
                    date: '5/4/24',
                    time: '7:30pm',
                    client: 'Joe Jackson',
                    party: '10'
                },
                {
                    date: '5/4/24',
                    time: '7:30pm',
                    client: 'Kelly Greene',
                    party: '2'
                },
                {
                    date: '6/4/24',
                    time: '5:00pm',
                    client: 'Don Johnson',
                    party: '4'
                },
                {
                    date: '6/4/24',
                    time: '6:00pm',
                    client: 'Judy Jones',
                    party: '3'
                }
            ],
            resCols: [
                {
                    id: 'date',
                    label: 'Date'
                },
                {
                    id: 'time',
                    label: 'Time'
                },
                {
                    id: 'client',
                    label: 'Client'
                },
                {
                    id: 'party',
                    label: 'Party#'
                }
            ],

            items: [
                {
                    id: 1,
                    title: 'Reservations',
                    number: '100'
                },
                {
                    id: 2,
                    title: 'Availability',
                    number: '40'
                }
            ]
        }
    }
}

</script>

<style lang="scss">
.dining-management {
    display: flex;
    flex-direction: column;
    height: 130vh;
    background-color: white;
    nav {
        margin: 0;
        padding: 12px;
        border-bottom: 1px solid black;
        background-color: white;
        text-align: center;
    }
    .main-header {
        background-color: #ECEBEB;
        h1 {
            color: #84A7AE;
        }
    }
    h2 {
        margin-top: 3rem;
    }
    .content {
        display: flex;
        gap: 4rem;
        justify-content: space-between;
        margin: 0 auto;
        padding: 3rem;
        .col {
            align-items: center;
            display: flex;
            flex-direction: column;
        }
        .basic-table.services {
            margin-top: 4rem;
        }
    }

    .main-container {
        display: flex;
        gap: 3rem;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 0em;
        .services {    
            padding: 20px 40px 40px 40px;
            border: 1px solid black;
        }
        .services h3 {
            font-size: x-large;
            text-align: center;
            color: black;
            padding: 10px;
        }
        .services h3:after {
            content: ' ';
            display: block;
            border: 1px solid black;
            width: 100%;
            margin-inline: auto;
            margin-block: 6px;
        }
    }

    h4 {
        text-align: left;
        padding-left: 0px;
        font-size: 1.1rem;
    }
    .event-item {
        margin-top: 1rem;
        padding-left: 0px;
        text-align: left;
    }

    .event-title {
        font-size: 1rem;
    }

    .event-list {
        font-size: 1rem;
    }

    button {
        background-color: white;
        color: rgb(105, 105, 105);
        padding: 15px 71px;
        text-align: center;
        display: inline-block;
        font-size: 16px;

    }
    .btn {
        margin-top: 1.2rem;
    }

    @media (max-width: 1208px) {
        .content {
            gap: 2rem;
            padding: 4rem 2rem;
        }
    }
}
</style>